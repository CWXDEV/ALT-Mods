using Aki.Reflection.Patching;
using EFT.InventoryLogic;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace MunitionsExpert.Patches
{
    internal class CachedAttributesPatch : ModulePatch
    {
        protected override MethodBase GetTargetMethod()
        {
            return typeof(AmmoTemplate).GetMethod("GetCachedReadonlyQualities", BindingFlags.Instance | BindingFlags.Public);
        }

        [PatchPostfix]
        private static void PatchPostfix(ref AmmoTemplate __instance, ref List<ItemAttributeClass> __result)
        {
            if (__result.All(a => (Attributes.ENewItemAttributeId)a.Id != Attributes.ENewItemAttributeId.Damage))
            {
                MunitionsExpertPlugin.AddNewAttributes(ref __result, __instance);
            }
        }
    }
}