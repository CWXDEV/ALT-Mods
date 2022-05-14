using EFT.Hideout;
using EFT.InventoryLogic;
using EFT.UI;
using EFT.UI.DragAndDrop;
using JetBrains.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace HideoutArchitect
{
    public class HideoutItemViewPanel : UIElement
    {
		public Image iconImage;					//_questIconImage
		public TextMeshProUGUI tooltipLabel;	//_questItemLabel
		public SimpleTooltip tooltip;			//simpleTooltip_0
		public string tooltipString;            //string_3
		public ItemView itemView;

		public bool initialized;

		public void Init()
        {
			if (initialized) return;

			HoverTrigger orAddComponent = base.gameObject.GetOrAddComponent<HoverTrigger>();
			orAddComponent.OnHoverStart += this.ShowTooltip;
			orAddComponent.OnHoverEnd += this.HideTooltip;
			initialized = true;
        }

		private void Awake()
		{
			Init();
		}

		public void Show(Item item, ItemView itemView, [CanBeNull] SimpleTooltip tooltip)
		{
			Init();

			this.itemView = itemView;

			if (this.tooltipLabel != null)
				this.tooltipLabel.gameObject.SetActive(true);
			this.tooltip = tooltip;

			UpdateTooltip();

			if (HideoutArchitect.IsNeededForHideoutUpgrades(item))
				base.ShowGameObject();
		}

		public void UpdateTooltip()
        {
			List<string> parts = new List<string>() { $"<color={HideoutArchitect.ModConfig.TooltipHeaderColor}><b>{"NEEDED FOR HIDEOUT".Localized().ToSentenceCase()}:</b></color>" };

			List<AreaData> areasToUpgrade = HideoutArchitect.GetApplicableUpgrades(this.itemView.Item);
			if (areasToUpgrade == null || areasToUpgrade.Count < 1) return;

			areasToUpgrade.ForEach(a =>
			{
				try
				{
					parts.Add($"<color=white>{a.Template.Name.ToSentenceCase() /*Already localized*/}:</color> {"LVL".Localized().ToSentenceCase()} {a.CurrentLevel + 1}");
                }
                catch (Exception ex)
                {
					Debug.LogError(ex);
                }
			});

			tooltipString = String.Join("\n", parts.Select(a => a.Trim()));
		}

		private void ShowTooltip(PointerEventData arg)
		{
			if (!(this.tooltip == null) && !string.IsNullOrEmpty(this.tooltipString))
			{
				this.tooltip.Show(this.tooltipString, null, 0f, null, true);
				return;
			}
		}

		private void HideTooltip(PointerEventData arg)
		{
			if (!(this.tooltip == null) && !string.IsNullOrEmpty(this.tooltipString))
			{
				this.tooltip.Close();
				return;
			}
		}
	}
}
