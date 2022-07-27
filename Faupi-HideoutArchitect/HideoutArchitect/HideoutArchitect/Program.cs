using Comfort.Common;
using EFT.Hideout;
using EFT.InventoryLogic;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using BepInEx;
using UnityEngine;
using Hideout = GClass1659;
using Requirement = GClass1683;

namespace HideoutArchitect
{
    [BepInPlugin("com.FAUPI.HideoutArchitect", "FAUPI-HideoutArchitect", "2.0.0")]
    public class HideoutArchitect : BaseUnityPlugin
    {
        private void Awake()
        {
            _ = ModConfig;  // Load the mod config
            _ = Resources.LoadTexture("neededforhideout", Path.Combine(ModInfo.path, "res/icon_neededforhideout_small.png"));
            Patcher.PatchAll();
        }

        private static ModConfiguration _modConfig;
        public static ModConfiguration ModConfig
        {
            private set
            {
                _modConfig = value;
            }
            get
            {
                if (_modConfig == null)
                    _modConfig = ModConfiguration.Load(ModInfo);
                return _modConfig;
            }
        }

        private static ModInformation _modInfo;
        public static ModInformation ModInfo
        {
            private set
            {
                _modInfo = value;
            }
            get
            {
                if (_modInfo == null)
                    _modInfo = ModInformation.Load();
                return _modInfo;
            }
        }

        private static Transform _gameObjectStorage;
        public static Transform GameObjectStorage
        {
            get
            {
                if (_gameObjectStorage == null)
                {
                    GameObject storage = new GameObject("HideoutArchitect Storage");
                    DontDestroyOnLoad(storage);
                    storage.SetActive(false);
                    _gameObjectStorage = storage.transform;
                }

                return _gameObjectStorage;
            }
        }

        public static List<AreaData> GetApplicableUpgrades(Item item)
        {
            List<AreaData> areas = Singleton<Hideout>.Instance.AreaDatas.Where(area =>
            {
                bool areaActive = area.Status != EAreaStatus.NotSet && area.Template.Enabled == true;

                List<Requirement> targetedRequirements;
                switch (ModConfig.NeededForHideoutDefinition)
                {
                    case ENeededDefinition.NextLevel:
                    case ENeededDefinition.NextLevelReady:
                        targetedRequirements = area.NextStage.Requirements.Value as List<Requirement>;
                        break;
                    default:
                        throw new NotImplementedException(Enum.GetName(typeof(ENeededDefinition), ModConfig.NeededForHideoutDefinition));
                }

                bool areaHasRequirements = targetedRequirements != null && targetedRequirements.Count > 0;

                bool itemFitsRequirements = targetedRequirements.Any(genericRequirement =>
                {
                    ItemRequirement itemRequirement = genericRequirement as ItemRequirement;
                    if (itemRequirement == null) return false;
                    return itemRequirement.TemplateId == item.TemplateId;
                });

                bool fitsSpecialFilter = false;
                switch (ModConfig.NeededForHideoutDefinition)
                {
                    case ENeededDefinition.NextLevel:
                        fitsSpecialFilter = true;   // None, we're only getting the item req
                        break;

                    case ENeededDefinition.NextLevelReady:
                        fitsSpecialFilter = targetedRequirements.All(genericRequirement =>  // Check if area requirement is fulfilled
                        {
                            if (genericRequirement is AreaRequirement)
                            {
                                return genericRequirement.Fulfilled;    // If area requirements are fulfilled
                            }
                            else
                            {
                                return true;
                            }
                        }
                        );
                        break;
                    default:
                        throw new NotImplementedException(Enum.GetName(typeof(ENeededDefinition), ModConfig.NeededForHideoutDefinition));
                }
                return areaActive && areaHasRequirements && itemFitsRequirements && fitsSpecialFilter;
            }).ToList();

            return areas;
        }

        public static bool IsNeededForHideoutUpgrades(Item item)
        {
            List<AreaData> data = GetApplicableUpgrades(item);
            return data != null && data.Count > 0;
        }
    }
}
