using EFT.UI;
using EFT.UI.DragAndDrop;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;
using TMPro;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;

namespace HideoutArchitect
{
    public static class Resources
    {
        public static Dictionary<string, Sprite> iconCache = new Dictionary<string, Sprite>();
        static HideoutItemViewPanel hideoutItemViewTemplate;

        public static HideoutItemViewPanel GetEditOffsetWindowTemplate(QuestItemViewPanel original = null)
        {
            if (hideoutItemViewTemplate != null)
                return hideoutItemViewTemplate;

            if (original == null)
                throw new ArgumentNullException("original", "Can't be null if template isn't created yet!");

            QuestItemViewPanel clone = GameObject.Instantiate<QuestItemViewPanel>(original);
            GameObject newObject = clone.gameObject;
            clone.transform.parent = HideoutArchitect.GameObjectStorage;
            newObject.name = "HideoutItem";

            HideoutItemViewPanel result = newObject.AddComponent<HideoutItemViewPanel>();

            //Copy fields over
            result.CopyFieldsFromQuestView(clone);

            //Set custom sprite
            if (result.iconImage != null)
            {
                result.iconImage.sprite = iconCache["neededforhideout"] ?? UnityEngine.Resources.Load<Sprite>("characteristics/icons/icon_info_faction");
            }

            GameObject.DestroyImmediate(clone);

            hideoutItemViewTemplate = result;
            return hideoutItemViewTemplate;
        }

        public static void CopyFieldsFromQuestView(this HideoutItemViewPanel hideoutItem, QuestItemViewPanel questItem)
        {
            hideoutItem.iconImage = typeof(QuestItemViewPanel).GetField("_questIconImage", BindingFlags.NonPublic | BindingFlags.Instance).GetValue(questItem) as Image;
            hideoutItem.tooltipLabel = typeof(QuestItemViewPanel).GetField("_questItemLabel", BindingFlags.NonPublic | BindingFlags.Instance).GetValue(questItem) as TextMeshProUGUI;
            hideoutItem.tooltip = typeof(QuestItemViewPanel).GetField("simpleTooltip_0", BindingFlags.NonPublic | BindingFlags.Instance).GetValue(questItem) as SimpleTooltip;
            hideoutItem.tooltipString = typeof(QuestItemViewPanel).GetField("string_4", BindingFlags.NonPublic | BindingFlags.Instance).GetValue(questItem) as string;
        }


        public static async Task LoadTexture(string id, string path)
        {
            using (UnityWebRequest uwr = UnityWebRequestTexture.GetTexture(path))
            {
                uwr.SendWebRequest();

                while (!uwr.isDone)
                    await Task.Delay(100);

                if (uwr.responseCode != 200)
                {
                    //Logger.Error($"[{HideoutArchitect.ModInfo.name}] Request error {uwr.responseCode}: {uwr.error}");
                }
                else
                {
                    // Get downloaded asset bundle
                    //Logger.Info($"[{HideoutArchitect.ModInfo.name}] Retrieved texture! {id.ToString()} from {path}");
                    Texture2D cachedTexture = DownloadHandlerTexture.GetContent(uwr);
                    iconCache.Add(id, Sprite.Create(cachedTexture, new Rect(0, 0, cachedTexture.width, cachedTexture.height), new Vector2(0, 0)));
                }
            }
        }
    }
}
