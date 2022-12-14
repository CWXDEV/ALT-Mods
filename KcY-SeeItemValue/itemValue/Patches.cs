using System;
using System.Reflection;
using Aki.Reflection.Patching;
using EFT.InventoryLogic;
using Ammo = BulletClass;
using Grenade = GClass2186;
using GrenadeTemplate = GClass2079;
using SecureContainer = GClass2132;
using SecureContainerTemplate = GClass2040;

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
            ItemValue.AddItemValue(ref __instance, id, template);
        }
    }

    public class AmmoPatch : ModulePatch
    {
        protected override MethodBase GetTargetMethod()
        {
            return typeof(Ammo).GetConstructor(new Type[] { typeof(string), typeof(AmmoTemplate) });
        }

        [PatchPostfix]
        private static void PatchPostFix(ref Ammo __instance, string id, AmmoTemplate template)
        {
            ItemValue.AddItemValue(ref __instance, id, template);
        }
    }

    public class GrenadePatch : ModulePatch
    {
        protected override MethodBase GetTargetMethod()
        {
            return typeof(Grenade).GetConstructor(new Type[] { typeof(string), typeof(GrenadeTemplate) });
        }

        [PatchPostfix]
        private static void PatchPostFix(ref Grenade __instance, string id, GrenadeTemplate template)
        {
            ItemValue.AddItemValue(ref __instance, id, template);
        }
    }

    public class SecureContainerPatch : ModulePatch
    {
        protected override MethodBase GetTargetMethod()
        {
            return typeof(SecureContainer).GetConstructor(new Type[] { typeof(string), typeof(SecureContainerTemplate) });
        }

        [PatchPostfix]
        private static void PatchPostFix(ref SecureContainer __instance, string id, SecureContainerTemplate template)
        {
            ItemValue.AddItemValue(ref __instance, id, template);
        }
    }
}