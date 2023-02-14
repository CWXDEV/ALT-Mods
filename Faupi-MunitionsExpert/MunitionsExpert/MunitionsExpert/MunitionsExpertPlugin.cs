using BepInEx;
using Comfort.Common;
using EFT.InventoryLogic;
using MunitionsExpert.Patches;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Networking;

namespace MunitionsExpert
{
    [BepInPlugin("com.Faupi.MunitionsExpert", "Faupi-MunitionsExpert", "1.7.0")]
    public class MunitionsExpertPlugin : BaseUnityPlugin
    {
        public static Dictionary<Enum, Sprite> iconCache = new Dictionary<Enum, Sprite>();

        private void Awake()
        {
            CacheIcons();
            new CachedAttributesPatch().Enable();
            new StaticIconsPatch().Enable();
        }

        public static void CacheIcons()
        {
            iconCache.Add(Attributes.ENewItemAttributeId.Damage, Resources.Load<Sprite>("characteristics/icons/icon_info_damage"));
            iconCache.Add(Attributes.ENewItemAttributeId.FragmentationChance, Resources.Load<Sprite>("characteristics/icons/icon_info_shrapnelcount"));
            iconCache.Add(EItemAttributeId.LightBleedingDelta, Resources.Load<Sprite>("characteristics/icons/icon_info_bloodloss"));
            iconCache.Add(EItemAttributeId.HeavyBleedingDelta, Resources.Load<Sprite>("characteristics/icon_info_hydration"));
            iconCache.Add(Attributes.ENewItemAttributeId.Penetration, Resources.Load<Sprite>("characteristics/icon_info_penetration"));
            _ = LoadTexture(Attributes.ENewItemAttributeId.ArmorDamage, Path.Combine(Directory.GetCurrentDirectory(), "BepInEx/plugins/Faupi-MunitionsExpert/armorDamage.png"));
            _ = LoadTexture(Attributes.ENewItemAttributeId.RicochetChance, Path.Combine(Directory.GetCurrentDirectory(), "BepInEx/plugins/Faupi-MunitionsExpert/ricochet.png"));
        }

        public static async Task LoadTexture(Enum id, string path)
        {
            var unityWebRequest = UnityWebRequestTexture.GetTexture(path);
            if (unityWebRequest != null)
            {
                unityWebRequest.SendWebRequest();

                while (!unityWebRequest.isDone)
                {
                    await Task.Delay(5);
                }

                if (unityWebRequest.responseCode != 200)
                {
                    Debug.LogError($"[MunitionsExpert]: Request Error - {unityWebRequest.responseCode}: {unityWebRequest.error}");
                }
                else
                {
                    Debug.LogError($"[MunitionsExpert]: Request Success - {id} from {path}");
                    var cachedTexture = DownloadHandlerTexture.GetContent(unityWebRequest);
                    iconCache.Add(id, Sprite.Create(cachedTexture, new Rect(0, 0, cachedTexture.width, cachedTexture.height), new Vector2(0, 0)));
                }
            }
        }

        public static void AddNewAttributes(ref List<ItemAttributeClass> attributes, AmmoTemplate template)
        {
            var totalDamage = template.Damage * template.ProjectileCount;
            var damageString = totalDamage.ToString();

            if (template.ProjectileCount > 1)
            {
                damageString += $" ({template.Damage} x {template.ProjectileCount})";
            }

            var damageAttribute = new ItemAttributeClass(Attributes.ENewItemAttributeId.Damage)
            {
                Name = Attributes.ENewItemAttributeId.Damage.GetName(),
                Base = () => totalDamage,
                StringValue = () => damageString,
                DisplayType = () => EItemAttributeDisplayType.Compact
            };
            attributes.Add(damageAttribute);

            if (template.ArmorDamage > 0)
            {
                var armorDamageAttribute = new ItemAttributeClass(Attributes.ENewItemAttributeId.ArmorDamage)
                {
                    Name = Attributes.ENewItemAttributeId.ArmorDamage.GetName(),
                    Base = () => template.ArmorDamage,
                    StringValue = () => $"{template.ArmorDamage}%",
                    DisplayType = () => EItemAttributeDisplayType.Compact
                };
                attributes.Add(armorDamageAttribute);
            }

            if (template.PenetrationPower > 0)
            {
                string GetStringValue()
                {
                    int ratedClass = 0;

                    if (!Singleton<BackendConfigSettingsClass>.Instantiated) { return $"[MunitionsExpert]: CLASS_DATA_MISSING {template.PenetrationPower}"; }
                    var armorClasses = Singleton<BackendConfigSettingsClass>.Instance.Armor.ArmorClass;

                    for (var i = 0; i < armorClasses.Length; i++)
                    {
                        if (armorClasses[i].Resistance > template.PenetrationPower) continue;

                        ratedClass = Math.Max(ratedClass, i);
                    }

                    return $"{(ratedClass > 0 ? $"Class {ratedClass}" : "Unarmored")} ({template.PenetrationPower})";
                }

                ItemAttributeClass penetrationAttribute = new ItemAttributeClass(Attributes.ENewItemAttributeId.Penetration)
                {
                    Name = Attributes.ENewItemAttributeId.Penetration.GetName(),
                    Base = () => template.PenetrationPower,
                    StringValue = GetStringValue,
                    DisplayType = () => EItemAttributeDisplayType.Compact
                };
                attributes.Add(penetrationAttribute);
            }

            if (template.FragmentationChance > 0)
            {
                ItemAttributeClass fragmentationAttribute = new ItemAttributeClass(Attributes.ENewItemAttributeId.FragmentationChance)
                {
                    Name = Attributes.ENewItemAttributeId.FragmentationChance.GetName(),
                    Base = () => template.FragmentationChance,
                    StringValue = () => $"{template.FragmentationChance * 100}%",
                    DisplayType = () => EItemAttributeDisplayType.Compact
                };
                attributes.Add(fragmentationAttribute);
            }

            if (template.RicochetChance > 0)
            {
                ItemAttributeClass ricochetAttribute = new ItemAttributeClass(Attributes.ENewItemAttributeId.RicochetChance)
                {
                    Name = Attributes.ENewItemAttributeId.RicochetChance.GetName(),
                    Base = () => template.RicochetChance,
                    StringValue = () => $"{template.RicochetChance * 100}%",
                    DisplayType = () => EItemAttributeDisplayType.Compact
                };
                attributes.Add(ricochetAttribute);
            }
        }
    }
}
