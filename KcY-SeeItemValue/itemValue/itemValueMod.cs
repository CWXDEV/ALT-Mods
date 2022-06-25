/* Original Author: KyC
 * CWX - updated to work for 2.3.0 AKI
 * Client version: 0.12.12.15.17107
 *  - removed the need for KyC's ModLoader
 *  - Commented out the code for stackCount total worth
 *  - Commented out the code for weapon parts total worth
 *  - Commented out the code for container total worth
 *  - Commented out the code for magazine total worth
 */

using Aki.Common.Http;
using Aki.Common.Utils;
using EFT.InventoryLogic;
using System;
using System.Collections.Generic;
using UnityEngine;
using ItemAttribute = GClass2100;

namespace itemValueMod
{
    public class ItemValue
    {
        public static void AddItemValue<T>(ref T __instance, string id, ItemTemplate template) where T : Item
        {
            // Remove item if it has no value
            // if (Math.Round(__instance.Value()) == 0) return;

            // Make a copy of the existing attributes list, this is needed for inherited types of Item that use a global attributes list (ammo)
            var atts = new List<ItemAttribute>();
            atts.AddRange(__instance.Attributes);
            __instance.Attributes = atts;
            ItemAttribute attr = new ItemAttribute(EItemAttributeId.MoneySum)
            {
                StringValue = new Func<string>(__instance.ValueStr), // ₽
                Name = "RUB ₽", //new Func<string>(ValueExtension.ValueTrName).ToString(),
                DisplayType = new Func<EItemAttributeDisplayType>(() => EItemAttributeDisplayType.Compact)
            };
            __instance.Attributes.Add(attr);
        }
    }

    public static class ValueExtension
    {
        static public Dictionary<string, int> dict = new Dictionary<string, int>();
        static object lockObject = new object();

        public static double Value(this Item item)
        {
            var template = item.Template;
            string itemId = template._id;
            JsonClass jsonClass;
            int _price;
            double editedPrice;
            double editedMulti;

            lock (lockObject)
            {
                if (!dict.TryGetValue(template._id, out _price))
                {
                    var json = RequestHandler.GetJson($"/cwx/seeitemvalue/{itemId}");
                    jsonClass = Json.Deserialize<JsonClass>(json);
                    editedPrice = jsonClass.price;
                    editedMulti = jsonClass.multiplier;

                    var medKit = item.GetItemComponent<MedKitComponent>();
                    if (medKit != null)
                    {
                        editedPrice *= medKit.HpResource / medKit.MaxHpResource;
                    }

                    var repair = item.GetItemComponent<RepairableComponent>();
                    if (repair != null)
                    {
                        editedPrice *= repair.Durability / repair.MaxDurability;
                    }

                    var dogtag = item.GetItemComponent<DogtagComponent>();
                    if (dogtag != null)
                    {
                        editedPrice *= dogtag.Level;
                    }

                    _price = Convert.ToInt32(editedPrice * editedMulti);
                    dict.Add(template._id, _price);
                }
            }

            return _price;
        }
        public static string ValueStr(this Item item)
        {
            return item.Value().ToString();
        }
    }
}