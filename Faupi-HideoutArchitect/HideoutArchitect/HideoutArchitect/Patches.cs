using EFT.InventoryLogic;
using EFT.UI;
using EFT.UI.DragAndDrop;
using System.Collections.Generic;
using System.Reflection;
using UnityEngine;
using Aki.Reflection.Patching;
using System;

namespace HideoutArchitect
{
    class Patcher
    {
        public static void PatchAll()
        {
            new PatchManager().RunPatches();
        }
    }

    public class PatchManager
    {
        public PatchManager()
        {
            this._patches = new List<ModulePatch>
            {
                new ItemViewPatches.GridItemViewUpdateInfoPatch(),
                new ItemViewPatches.ItemViewInitPatch(),
                new ItemViewPatches.NewGridItemViewPatch()
            };
        }

        public void RunPatches()
        {
            foreach (ModulePatch patch in this._patches)
            {
                patch.Enable();
            }
        }

        private readonly List<ModulePatch> _patches;
    }

    public static class ItemViewPatches
    {
        public static Dictionary<ItemView, HideoutItemViewPanel> hideoutPanels = new Dictionary<ItemView, HideoutItemViewPanel>();

        public static void SetHideoutItemViewPanel(this ItemView __instance)
        {
            if (!hideoutPanels.TryGetValue(__instance, out HideoutItemViewPanel hideoutItemViewPanel))
                return;

            ItemUiContext itemUiContext = typeof(ItemView).GetField("ItemUiContext", BindingFlags.NonPublic | BindingFlags.Instance).GetValue(__instance) as ItemUiContext;

            if (hideoutItemViewPanel != null)
            {
                hideoutItemViewPanel.Show(__instance.Item, __instance, itemUiContext?.Tooltip);
                return;
            }
        }

        public class NewGridItemViewPatch : ModulePatch
        {
            protected override MethodBase GetTargetMethod()
            {
                return typeof(GridItemView).GetMethod("NewGridItemView", BindingFlags.Instance | BindingFlags.NonPublic);
            }

            [PatchPostfix]
            private static void PatchPostfix(ref GridItemView __instance, Item item)
            {
                if (hideoutPanels.ContainsKey(__instance)) return;

                try
                {
                    QuestItemViewPanel questIconPanel = typeof(ItemView).GetField("_questsItemViewPanel", BindingFlags.NonPublic | BindingFlags.Instance).GetValue(__instance) as QuestItemViewPanel;
                    
                    HideoutItemViewPanel hideoutIconPanel = GameObject.Instantiate(Resources.GetEditOffsetWindowTemplate(questIconPanel), questIconPanel.transform.parent);
                    hideoutIconPanel.transform.SetAsFirstSibling();
                    hideoutPanels[__instance] = hideoutIconPanel;

                    hideoutIconPanel.gameObject.SetActive(true);
                }
                catch (Exception message)
                {
                    Debug.LogError($"Hideout Panel issue: {message}");
                    // Item doesn't have a "quest item" icon panel, so it's probably static
                }
            }
        }

        public class ItemViewInitPatch : ModulePatch
        {
            protected override MethodBase GetTargetMethod()
            {
                return typeof(ItemView).GetMethod("Init", BindingFlags.Instance | BindingFlags.NonPublic);
            }

            [PatchPostfix]
            private static void PatchPostfix(ref ItemView __instance)
            {
                __instance.SetHideoutItemViewPanel();
            }
        }

        public class GridItemViewUpdateInfoPatch : ModulePatch
        {
            protected override MethodBase GetTargetMethod()
            {
                return typeof(GridItemView).GetMethod("UpdateInfo", BindingFlags.Instance | BindingFlags.Public);
            }

            [PatchPostfix]
            private static void PatchPostfix(ref GridItemView __instance)
            {
                if (!__instance.IsSearched)
                    return;

                if (!hideoutPanels.TryGetValue(__instance, out HideoutItemViewPanel hideoutItemViewPanel))
                    return;
                hideoutItemViewPanel.iconImage.gameObject.SetActive(HideoutArchitect.IsNeededForHideoutUpgrades(__instance.Item));

                __instance.SetHideoutItemViewPanel();
            }
        }
    }
}
