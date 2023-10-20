using System;
using System.Reflection;
using Aki.Reflection.Patching;
using EFT.InventoryLogic;

namespace itemValueMod
{
    public class ItemPatch : ModulePatch
    {
        protected override MethodBase GetTargetMethod()
        {
            return typeof(Item).GetConstructor(new Type[] { typeof(string), typeof(ItemTemplate) });
        }

        [PatchPostfix]
        private static void PatchPostFix(ref Item __instance, string id, ItemTemplate template)
        {
            ItemValue.AddItemValue(ref __instance, template);
        }
    }

    public class AmmoPatch : ModulePatch
    {
        protected override MethodBase GetTargetMethod()
        {
            return typeof(BulletClass).GetConstructor(new Type[] { typeof(string), typeof(AmmoTemplate) });
        }

        [PatchPostfix]
        private static void PatchPostFix(ref BulletClass __instance, string id, AmmoTemplate template)
        {
            ItemValue.AddItemValue(ref __instance, template);
        }
    }

    public class GrenadePatch : ModulePatch
    {
        protected override MethodBase GetTargetMethod()
        {
            return typeof(GrenadeClass).GetConstructor(new Type[] { typeof(string), typeof(ThrowableWeaponClass) });
        }

        [PatchPostfix]
        private static void PatchPostFix(ref GrenadeClass __instance, string id, ThrowableWeaponClass template)
        {
            ItemValue.AddItemValue(ref __instance, template);
        }
    }

    public class SecureContainerPatch : ModulePatch
    {
        protected override MethodBase GetTargetMethod()
        {
            return typeof(ItemContainerClass).GetConstructor(new Type[] { typeof(string), typeof(SecureContainerTemplateClass) });
        }

        [PatchPostfix]
        private static void PatchPostFix(ref ItemContainerClass __instance, string id, SecureContainerTemplateClass template)
        {
            ItemValue.AddItemValue(ref __instance, template);
        }
    }
}