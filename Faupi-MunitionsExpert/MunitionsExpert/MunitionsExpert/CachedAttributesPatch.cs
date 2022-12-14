using Aki.Reflection.Patching;
using EFT.InventoryLogic;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using ItemAttributes = GClass2197;

namespace MunitionsExpert
{
	internal class CachedAttributesPatch : ModulePatch
	{
		protected override MethodBase GetTargetMethod()
		{
			return typeof(AmmoTemplate).GetMethod("GetCachedReadonlyQualities", BindingFlags.Instance | BindingFlags.Public);
		}

		[PatchPostfix]
		private static void PatchPostfix(ref AmmoTemplate __instance, ref List<ItemAttributes> __result)
		{
			if (!__result.Any((ItemAttributes a) => (Attributes.ENewItemAttributeId)a.Id == Attributes.ENewItemAttributeId.Damage))
			{
				//MunitionsExpert.FormatExistingAttributes(ref __result, __instance);
				Plugin.AddNewAttributes(ref __result, __instance);
			}
		}
	}
}