using System;
using System.Reflection;
using Aki.Reflection.Patching;
using EFT.UI;
using UnityEngine;

namespace MunitionsExpert
{
	internal class StaticIconsPatch : ModulePatch
	{
		protected override MethodBase GetTargetMethod()
		{
			return typeof(StaticIcons).GetMethod("GetAttributeIcon", BindingFlags.Instance | BindingFlags.Public);
		}

		[PatchPrefix]
		private static bool PatchPrefix(ref Sprite __result, Enum id)
		{
			if (id == null || !Plugin.iconCache.ContainsKey(id))
			{
				return true;
			}

			Sprite sprite = Plugin.iconCache[id];

			if (sprite != null)
			{
				__result = sprite;
				return false;
			}

			return true;
		}
	}
}