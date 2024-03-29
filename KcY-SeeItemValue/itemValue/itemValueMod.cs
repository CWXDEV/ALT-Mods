﻿using Aki.Common.Http;
using Aki.Common.Utils;
using EFT.InventoryLogic;
using System;
using System.Collections.Generic;
using System.Reflection;
using UnityEngine;
using System.IO;
using System.Linq;
using Comfort.Common;

namespace itemValueMod
{
    public class ItemValue
    {
        public static void AddItemValue<T>(ref T __instance, ItemTemplate template) where T : Item
        {

            __instance.SetupShit();
            //var atts = new List<ItemAttributeClass>();
            //atts.AddRange(__instance.Attributes);
            //__instance.Attributes = atts;

            //var attr1 = new ItemAttributeClass(EItemAttributeId.MoneySum)
            //{
            //    StringValue = __instance.TraderPrice(template),
            //    FullStringValue = __instance.TraderName,
            //    Name = "TRADER",
            //    DisplayType = () => EItemAttributeDisplayType.Compact
            //};

            //__instance.Attributes.Add(attr1);
        }
    }

    public static class ValueExtension
    {
        public static ItemFactory ItemFactoryInstance;

        public static void SetupShit(this Item item)
        {
            ItemFactoryInstance = Singleton<ItemFactory>.Instance;
            var itemTemplate = ItemFactoryInstance.ItemTemplates.Values.First(x => x._id == item.TemplateId).Name;

            


            Debug.LogError($"[itemTemplate] {itemTemplate}");

        }

        //public static Func<string> TraderPrice(this Item item, ItemTemplate template)
        //{
        //    string itemId = item.Template._id;
        //    JsonClass jsonClass;
        //    double alteredPrice = 1;

        //    if (jsonClass.price != 1)
        //    {
        //        alteredPrice = DurabilityCheck(item, jsonClass);
        //    }

        //    double _price = alteredPrice * jsonClass.multiplier;

        //    return Math.Round(_price).ToString();
        //}

        //public static string TraderName(this Item item)
        //{
        //    string itemId = item.Template._id;
        //    JsonClass jsonClass;

        //    return jsonClass.traderName;
        //}

        //public static double DurabilityCheck(this Item item, JsonClass jsonClass)
        //{
        //    double editedPrice = jsonClass.price;
        //    double originalMax = jsonClass.originalMax;

        //    DebugMode($" Entered DurabilityCheck() - starting price is: {editedPrice}");

        //    var medKit = item.GetItemComponent<MedKitComponent>();
        //    if (medKit != null && medKit.HpResource != 0 && medKit.MaxHpResource != 0)
        //    {
        //        DebugMode($" Medkit Check - HpResource is: {medKit.HpResource}");
        //        DebugMode($" Medkit Check - MaxHpResource is: {medKit.MaxHpResource}");

        //        editedPrice *= medKit.HpResource / medKit.MaxHpResource;
        //    }

        //    DebugMode($" After Medkit Check - price is: {editedPrice}");

        //    var repair = item.GetItemComponent<RepairableComponent>();
        //    if (repair != null)
        //    {
        //        if (repair.Durability > 0)
        //        {
        //            DebugMode($" repairable Check - Durability is: {repair.Durability}");
        //            DebugMode($" Medkit Check - originalMax is: {originalMax}");

        //            editedPrice *= repair.Durability / originalMax;
        //        }
        //        else
        //        {
        //            DebugMode($" repairable Check - Durability is 0");

        //            editedPrice = 1;
        //        }
        //    }

        //    DebugMode($" After repairable Check - price is: {editedPrice}");

        //    var dogtag = item.GetItemComponent<DogtagComponent>();
        //    if (dogtag != null && dogtag.Level != 0)
        //    {
        //        DebugMode($" dogtag Check - level is: {dogtag.Level}");

        //        editedPrice *= dogtag.Level;
        //    }

        //    DebugMode($" After dogtag Check - price is: {editedPrice}");

        //    var repairKit = item.GetItemComponent<RepairKitComponent>();
        //    if (repairKit != null)
        //    {
        //        if (repairKit.Resource > 0)
        //        {
        //            DebugMode($" repairkit Check - Resource is: {repairKit.Resource}");
        //            DebugMode($" repairkit Check - originalMax is: {originalMax}");

        //            editedPrice *= repairKit.Resource / originalMax;
        //        }
        //        else
        //        {
        //            DebugMode($" repairkit Check - Resource is 0");

        //            editedPrice = 1;
        //        }
        //    }

        //    DebugMode($" After repairkit Check - price is: {editedPrice}");

        //    var resource = item.GetItemComponent<ResourceComponent>();
        //    if (resource != null && resource.Value != 0 && resource.MaxResource != 0)
        //    {
        //        DebugMode($" resource Check - Resource is: {resource.Value}");
        //        DebugMode($" resource Check - MaxResource is: {resource.MaxResource}");

        //        editedPrice *= resource.Value / resource.MaxResource;
        //    }

        //    DebugMode($" After resource Check - price is: {editedPrice}");

        //    var foodDrink = item.GetItemComponent<FoodDrinkComponent>();
        //    if (foodDrink != null && foodDrink.HpPercent != 0)
        //    {
        //        GInterface234 ginterface234_0 = (GInterface234)foodDrink.GetType().GetField("ginterface234_0", BindingFlags.NonPublic | BindingFlags.Instance).GetValue(foodDrink);

        //        DebugMode($" foodDrink Check - HpPercent is: {foodDrink.HpPercent}");
        //        DebugMode($" foodDrink Check - MaxResource is: {ginterface234_0.MaxResource}");

        //        editedPrice *= foodDrink.HpPercent / ginterface234_0.MaxResource;
        //    }

        //    DebugMode($" After foodDrink Check - price is: {editedPrice}");

        //    var keys = item.GetItemComponent<KeyComponent>();
        //    if (keys != null)
        //    {
        //        GInterface238 template = (GInterface238)keys.GetType().GetField("Template", BindingFlags.Public | BindingFlags.Instance).GetValue(keys);

        //        if (keys.NumberOfUsages > 0)
        //        {
        //            double totalMinusUsed = Convert.ToDouble(template.MaximumNumberOfUsage - keys.NumberOfUsages);
        //            double multi = totalMinusUsed / template.MaximumNumberOfUsage;

        //            DebugMode($" foodDrink Check - totalMinusUsed is: {totalMinusUsed}");
        //            DebugMode($" foodDrink Check - multi is: {multi}");

        //            editedPrice *= multi;
        //        }
        //    }

        //    DebugMode($" After keys Check - price is: {editedPrice}");

        //    var sideEffect = item.GetItemComponent<SideEffectComponent>();
        //    if (sideEffect != null && sideEffect.Value != 0)
        //    {
        //        DebugMode($" sideEffect Check - resource is: {sideEffect.Value}");
        //        DebugMode($" sideEffect Check - MaxResource is: {sideEffect.MaxResource}");

        //        editedPrice *= sideEffect.Value / sideEffect.MaxResource;
        //    }

        //    DebugMode($" After sideEffect Check - price is: {editedPrice}");

        //    DebugMode($"Ending price: {editedPrice}");

        //    return editedPrice;
        //}

        //public static void DebugMode(String str)
        //{
        //    var directory = Directory.GetCurrentDirectory();

        //    var modDirectory = new DirectoryInfo(directory + "/user/mods/");
        //    DirectoryInfo[] dirsInDir = modDirectory.GetDirectories("*" + "SeeItemValue" + "*.*");

        //    if (dirsInDir.Length == 1)
        //    {
        //        var json = File.ReadAllText(dirsInDir[0].ToString() + "/src/config.json");

        //        var configJson = Json.Deserialize<ConfigClass>(json);

        //        if (configJson != null && configJson.DebugMode)
        //        {
        //            Debug.LogError(str);
        //        }
        //    }
        //}
    }
}