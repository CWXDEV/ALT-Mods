using Aki.Common.Http;
using Aki.Common.Utils;
using EFT.InventoryLogic;
using System;
using System.Collections.Generic;
using UnityEngine;
using System.Reflection;
using ItemAttribute = GClass2185;

namespace itemValueMod
{
    public class ItemValue
    {
        public static void AddItemValue<T>(ref T __instance, string id, ItemTemplate template) where T : Item
        {
            var atts = new List<ItemAttribute>();
            atts.AddRange(__instance.Attributes);
            __instance.Attributes = atts;
            ItemAttribute attr = new ItemAttribute(EItemAttributeId.MoneySum)
            {
                StringValue = new Func<string>(__instance.ValueStr),
                Name = "RUB ₽",
                DisplayType = new Func<EItemAttributeDisplayType>(() => EItemAttributeDisplayType.Compact)
            };
            __instance.Attributes.Add(attr);
        }
    }

    public static class ValueExtension
    {
        static public Dictionary<string, JsonClass> dict = new Dictionary<string, JsonClass>();
        static object lockObject = new object();

        public static double Value(this Item item)
        {
            var template = item.Template;
            string itemId = template._id;
            JsonClass jsonClass;
            double _price;
            double editedPrice;
            double editedMulti;
            double originalMax;

            lock (lockObject)
            {
                if (!dict.TryGetValue(template._id, out jsonClass))
                {
                    var json = RequestHandler.GetJson($"/cwx/seeitemvalue/{itemId}");
                    jsonClass = Json.Deserialize<JsonClass>(json);

                    dict.Add(template._id, jsonClass);
                }
            }

            editedPrice = jsonClass.price;
            editedMulti = jsonClass.multiplier;
            originalMax = jsonClass.originalMax;
            //Debug.LogError($" editedPrice: {editedPrice}");
            //Debug.LogError($" editedMulti: {editedMulti}");
            //Debug.LogError($" originalMax: {originalMax}");

            var medKit = item.GetItemComponent<MedKitComponent>();
            if (medKit != null && medKit.HpResource != 0 && medKit.MaxHpResource != 0)
            {
                editedPrice *= medKit.HpResource / medKit.MaxHpResource;
                //Debug.LogError($" MedKitComponent: {editedPrice}");
            }

            var repair = item.GetItemComponent<RepairableComponent>();
            if (repair != null)
            {
                if (repair.Durability > 0)
                {
                    editedPrice *= repair.Durability / originalMax;
                    //Debug.LogError($" RepairableComponent: {editedPrice}");
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
                //Debug.LogError($" DogtagComponent: {editedPrice}");
            }

            var repairKit = item.GetItemComponent<RepairKitComponent>();
            if (repairKit != null)
            {
                if (repairKit.Resource > 0)
                {
                    editedPrice *= repairKit.Resource / originalMax;
                    //Debug.LogError($" RepairKitComponent: {editedPrice}");
                }
                else
                {
                    editedPrice = 1;
                }
            }

            var resource = item.GetItemComponent<ResourceComponent>();
            if (resource != null && resource.Value != 0 && resource.MaxResource != 0)
            {
                //Debug.LogError($" ResourceComponent.value: {resource.Value}");
                //Debug.LogError($" ResourceComponent.MaxResource: {resource.MaxResource}");

                editedPrice *= resource.Value / resource.MaxResource;
                //Debug.LogError($" ResourceComponent: {editedPrice}");
            }

            var foodDrink = item.GetItemComponent<FoodDrinkComponent>();
            if (foodDrink != null && foodDrink.HpPercent != 0)
            {
                GInterface208 ginterface208_0 = (GInterface208)foodDrink.GetType().GetField("ginterface208_0", BindingFlags.NonPublic | BindingFlags.Instance).GetValue(foodDrink);

                editedPrice *= foodDrink.HpPercent / ginterface208_0.MaxResource;
                //Debug.LogError($" FoodDrinkComponent: {editedPrice}");
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
                    //Debug.LogError($" KeyComponent: {editedPrice}");
                }
            }

            var sideEffect = item.GetItemComponent<SideEffectComponent>();
            if (sideEffect != null && sideEffect.Value != 0)
            {
                editedPrice *= sideEffect.Value / sideEffect.MaxResource;
                //Debug.LogError($" SideEffectComponent: {editedPrice}");
            }

            _price = editedPrice * editedMulti;
            //Debug.LogError($"ENDING PRICE: {_price}");

            return _price;
        }
        public static string ValueStr(this Item item)
        {
            var result = Math.Round(item.Value()).ToString();
            //Debug.LogError($"price, rounded to string: {result}");

            return result;
        }
    }
}