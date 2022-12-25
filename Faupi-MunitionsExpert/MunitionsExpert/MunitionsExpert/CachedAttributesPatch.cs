﻿using Aki.Reflection.Patching;
using EFT.InventoryLogic;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace MunitionsExpert
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
			if (!__result.Any((ItemAttributeClass a) => (Attributes.ENewItemAttributeId)a.Id == Attributes.ENewItemAttributeId.Damage))
			{
				//MunitionsExpert.FormatExistingAttributes(ref __result, __instance);
				Plugin.AddNewAttributes(ref __result, __instance);
			}
		}
	}
}