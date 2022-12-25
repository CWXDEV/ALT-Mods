using System;
using System.IO;
using System.Collections.Generic;
using UnityEngine;
using EFT.InventoryLogic;
using UnityEngine.Networking;
using System.Threading.Tasks;
using BepInEx;
using Comfort.Common;
using Newtonsoft.Json;
using Aki.Common.Utils;
using static MunitionsExpert.Attributes;
using Aki.Common.Http;

namespace MunitionsExpert
{
    [BepInPlugin("com.Faupi.MunitionsExpert", "Faupi-MunitionsExpert", "1.6.8")]
    public class Plugin : BaseUnityPlugin
    {
        public static Dictionary<Enum, Sprite> iconCache = new Dictionary<Enum, Sprite>();
        public static List<ItemAttributeClass> penAttributes = new List<ItemAttributeClass>();
        public static string modPath;

        private void Awake()
        {
            GetPath();
            new CachedAttributesPatch().Enable();
            new StaticIconsPatch().Enable();
            CacheIcons();
        }

        private void GetPath()
        {
            var mod = RequestHandler.GetJson($"/MunitionsExpert/GetInfo");
            modPath = Json.Deserialize<string>(mod);
        }

        public static void CacheIcons()
        {
            iconCache.Add(ENewItemAttributeId.Damage, Resources.Load<Sprite>("characteristics/icons/icon_info_damage"));
            iconCache.Add(ENewItemAttributeId.FragmentationChance, Resources.Load<Sprite>("characteristics/icons/icon_info_shrapnelcount"));
            iconCache.Add(EItemAttributeId.LightBleedingDelta, Resources.Load<Sprite>("characteristics/icons/icon_info_bloodloss"));
            iconCache.Add(EItemAttributeId.HeavyBleedingDelta, Resources.Load<Sprite>("characteristics/icon_info_hydration"));
            iconCache.Add(ENewItemAttributeId.Penetration, Resources.Load<Sprite>("characteristics/icon_info_penetration"));
            _ = LoadTexture(ENewItemAttributeId.ArmorDamage, Path.Combine(modPath, "res\\armorDamage.png"));
            _ = LoadTexture(ENewItemAttributeId.RicochetChance, Path.Combine(modPath, "res\\armorDamage.png"));
        }

        public static async Task LoadTexture(Enum id, string path)
        {
            using (UnityWebRequest uwr = UnityWebRequestTexture.GetTexture(path))
            {
                uwr.SendWebRequest();

                while (!uwr.isDone)
                    await Task.Delay(5);

                if (uwr.responseCode != 200)
                {
                    //Log.Error($"[{modName}] Request error {uwr.responseCode}: {uwr.error}");
                }
                else
                {
                    // Get downloaded asset bundle
                    //Log.Info($"[{modName}] Retrieved texture! {id.ToString()} from {path}");
                    Texture2D cachedTexture = DownloadHandlerTexture.GetContent(uwr);
                    iconCache.Add(id, Sprite.Create(cachedTexture, new Rect(0, 0, cachedTexture.width, cachedTexture.height), new Vector2(0, 0)));
                }
            }
        }

        public static void AddNewAttributes(ref List<ItemAttributeClass> attributes, AmmoTemplate template)
        {
            int projCount = template.ProjectileCount;
            int totalDamage = template.Damage * template.ProjectileCount;

            string damageStr = totalDamage.ToString(); // Total damage
            if (template.ProjectileCount > 1)
            {
                damageStr += $" ({template.Damage} x {template.ProjectileCount})";  // Add the "damage calculation" after total damage (damage per pellet * pellet count)
            }

            ItemAttributeClass at_damage = new ItemAttributeClass(ENewItemAttributeId.Damage)
            {
                Name = ENewItemAttributeId.Damage.GetName(),
                Base = () => totalDamage,
                StringValue = () => damageStr,
                DisplayType = () => EItemAttributeDisplayType.Compact
            };
            attributes.Add(at_damage);

            if (template.ArmorDamage > 0)
            {
                ItemAttributeClass at_armordmg = new ItemAttributeClass(ENewItemAttributeId.ArmorDamage)
                {
                    Name = ENewItemAttributeId.ArmorDamage.GetName(),
                    Base = () => template.ArmorDamage,
                    StringValue = () => $"{(template.ArmorDamage).ToString()}%",
                    DisplayType = () => EItemAttributeDisplayType.Compact
                };
                attributes.Add(at_armordmg);
            }

            if (template.PenetrationPower > 0)
            {
                string getStringValue()
                {
                    int ratedClass = 0;

                    if (!Singleton<BackendConfigSettingsClass>.Instantiated) { return $"CLASS_DATA_MISSING {template.PenetrationPower.ToString()}"; }
                    BackendConfigSettingsClass.GClass1226.GClass1227[] classes = Singleton<BackendConfigSettingsClass>.Instance.Armor.ArmorClass;
                    for (int i = 0; i < classes.Length; i++)
                    {
                        if (classes[i].Resistance > template.PenetrationPower) continue;
                        ratedClass = Math.Max(ratedClass, i);
                    }

                    return $"{(ratedClass > 0 ? $"{"ME_class".Localized()} {ratedClass}" : "ME_noarmor".Localized())} ({template.PenetrationPower.ToString()})";
                }

                ItemAttributeClass at_pen = new ItemAttributeClass(ENewItemAttributeId.Penetration)
                {
                    Name = ENewItemAttributeId.Penetration.GetName(),
                    Base = () => template.PenetrationPower,
                    StringValue = getStringValue,
                    DisplayType = () => EItemAttributeDisplayType.Compact
                };
                attributes.Add(at_pen);
            }

            if (template.FragmentationChance > 0)
            {
                ItemAttributeClass at_frag = new ItemAttributeClass(ENewItemAttributeId.FragmentationChance)
                {
                    Name = ENewItemAttributeId.FragmentationChance.GetName(),
                    Base = () => template.FragmentationChance,
                    StringValue = () => $"{(template.FragmentationChance * 100).ToString()}%",
                    DisplayType = () => EItemAttributeDisplayType.Compact
                };
                attributes.Add(at_frag);
            }

            if (template.RicochetChance > 0)
            {
                ItemAttributeClass at_ricochet = new ItemAttributeClass(ENewItemAttributeId.RicochetChance)
                {
                    Name = ENewItemAttributeId.RicochetChance.GetName(),
                    Base = () => template.RicochetChance,
                    StringValue = () => $"{(template.RicochetChance * 100).ToString()}%",
                    DisplayType = () => EItemAttributeDisplayType.Compact
                };
                attributes.Add(at_ricochet);
            }
        }
    }
}
