using Aki.Common.Http;
using Aki.Common.Utils;
using EFT.InventoryLogic;
using System;
using System.Collections.Generic;
using System.Reflection;
using ItemAttribute = GClass2197;
using System.Net;
using System.Threading;
using UnityEngine;

namespace itemValueMod
{
    public class ItemValue
    {
        public static void AddItemValue<T>(ref T __instance, string id, ItemTemplate template) where T : Item
        {
            var atts = new List<ItemAttribute>();
            atts.AddRange(__instance.Attributes);
            __instance.Attributes = atts;

            ItemAttribute attr1 = new ItemAttribute(EItemAttributeId.MoneySum)
            {
                StringValue = new Func<string>(__instance.TraderPrice),
                FullStringValue = new Func<string>(__instance.TraderName),
                Name = "TRADER",
                DisplayType = new Func<EItemAttributeDisplayType>(() => EItemAttributeDisplayType.Compact)
            };

            __instance.Attributes.Add(attr1);
        }
    }

    public static class ValueExtension
    {
        static public Dictionary<string, JsonClass> itemDictionary = new Dictionary<string, JsonClass>();
        static object lockObject = new object();

        public static JsonClass GetData(String itemId)
        {
            var json = RequestHandler.GetJson($"/cwx/seeitemvalue/{itemId}");
            var jsonClass = Json.Deserialize<JsonClass>(json);

            itemDictionary.Add(itemId, jsonClass);

            return jsonClass;
        }

        public static string TraderPrice(this Item item)
        {
            string itemId = item.Template._id;
            JsonClass jsonClass;
            bool lockWasTaken = false;

            try
            {
                Monitor.Enter(lockObject, ref lockWasTaken);

                if(!itemDictionary.TryGetValue(itemId, out jsonClass))
                {
                    jsonClass = GetData(item.Template._id);
                }
            }
            catch (WebException)
            {
                return $"[SeeItemValue] Issue happened whilst getting Item from server";
            }
            finally
            {
                if (lockWasTaken)
                {
                    Monitor.Exit(lockObject);
                }
            }


            double alteredPrice = DurabilityCheck(item, jsonClass);

            Debug.LogError($"price: {alteredPrice}");

            double _price = alteredPrice * jsonClass.multiplier;

            Debug.LogError($"price: {jsonClass.multiplier}");
            Debug.LogError($"price: {_price}");

            return Math.Round(_price).ToString();
        }

        public static string TraderName(this Item item)
        {
            string itemId = item.Template._id;
            JsonClass jsonClass;
            bool lockWasTaken = false;

            try
            {
                Monitor.Enter(lockObject, ref lockWasTaken);

                if (!itemDictionary.TryGetValue(itemId, out jsonClass))
                {
                    jsonClass = GetData(item.Template._id);
                }
            }
            catch (WebException)
            {
                return $"[SeeItemValue] Issue happened whilst getting Item from server";
            }
            finally
            {
                if (lockWasTaken)
                {
                    Monitor.Exit(lockObject);
                }
            }

            return jsonClass.traderName;
        }

        public static double DurabilityCheck(this Item item, JsonClass jsonClass)
        {
            double editedPrice = jsonClass.price;
            double originalMax = jsonClass.originalMax;

            Debug.LogError($"price: {jsonClass.price}");


            var medKit = item.GetItemComponent<MedKitComponent>();
            if (medKit != null && medKit.HpResource != 0 && medKit.MaxHpResource != 0)
            {
                editedPrice *= medKit.HpResource / medKit.MaxHpResource;
            }

            var repair = item.GetItemComponent<RepairableComponent>();
            if (repair != null)
            {
                if (repair.Durability > 0)
                {
                    editedPrice *= repair.Durability / originalMax;
                }
                else
                {
                    editedPrice = 1;
                }
            }

            var dogtag = item.GetItemComponent<DogtagComponent>();
            if (dogtag != null && dogtag.Level != 0)
            {
                editedPrice *= dogtag.Level;
            }

            var repairKit = item.GetItemComponent<RepairKitComponent>();
            if (repairKit != null)
            {
                if (repairKit.Resource > 0)
                {
                    editedPrice *= repairKit.Resource / originalMax;
                }
                else
                {
                    editedPrice = 1;
                }
            }

            var resource = item.GetItemComponent<ResourceComponent>();
            if (resource != null && resource.Value != 0 && resource.MaxResource != 0)
            {

                editedPrice *= resource.Value / resource.MaxResource;
            }

            var foodDrink = item.GetItemComponent<FoodDrinkComponent>();
            if (foodDrink != null && foodDrink.HpPercent != 0)
            {
                GInterface208 ginterface208_0 = (GInterface208)foodDrink.GetType().GetField("ginterface208_0", BindingFlags.NonPublic | BindingFlags.Instance).GetValue(foodDrink);

                editedPrice *= foodDrink.HpPercent / ginterface208_0.MaxResource;
            }

            var keys = item.GetItemComponent<KeyComponent>();
            if (keys != null)
            {
                GInterface212 ginterface212_0 = (GInterface212)keys.GetType().GetField("Template", BindingFlags.Public | BindingFlags.Instance).GetValue(keys);

                if (keys.NumberOfUsages > 0)
                {
                    double totalMinusUsed = Convert.ToDouble(ginterface212_0.MaximumNumberOfUsage - keys.NumberOfUsages);
                    double multi = totalMinusUsed / ginterface212_0.MaximumNumberOfUsage;

                    editedPrice *= multi;
                }
            }

            var sideEffect = item.GetItemComponent<SideEffectComponent>();
            if (sideEffect != null && sideEffect.Value != 0)
            {
                editedPrice *= sideEffect.Value / sideEffect.MaxResource;
            }

            Debug.LogError($"price: {jsonClass.price}");

            return editedPrice;
        }
    }
}