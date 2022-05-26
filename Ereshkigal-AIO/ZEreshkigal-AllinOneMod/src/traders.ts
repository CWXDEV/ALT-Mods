import { IConfig } from "../models/IConfig";
import { ItemHelper } from "../types/helpers/ItemHelper";
import type { ILogger } from "../types/models/spt/utils/ILogger";
import { DatabaseServer } from "../types/servers/DatabaseServer";
import { Other } from "./other";

export class Traders
{
    private traders;

    constructor(
        private logger: ILogger,
        private config: IConfig,
        private database: DatabaseServer,
        private other: Other
        )
    {}

    public ApplyChanges()
    {
        this.traders = this.database.getTables().traders;
        const quests = this.database.getTables().templates.quests;
        const suits = this.database.getTables().templates.customization;
    
        //Enable all the quests
        if (this.config.traders.allQuestsAvailable)
        {
            for (let id in quests)
            {
                if (this.other.IsThisIDaMod([id]) === false)
                {
                    let questData = quests[id];
                    questData.conditions.AvailableForStart = [
                    {
                        _parent: "Level",
                        _props: 
                        {
                            compareMethod: ">=",
                            value: 1,
                            index: 0,
                            parentId: "",
                            id: "AllInOne-Mod: AllQuestsAvailable",
                            dynamicLocale: false
                        },
                        dynamicLocale: false
                    }];
                }
            }
        }
    
        if (this.config.traders.removeFIRConditionOnQuests)
        {
            for (const id in quests)
            {
                let condition = quests[id].conditions.AvailableForFinish;
                for (const requirements in condition)
                {
                    let requirement = condition[requirements];
                    if (requirement._parent === "FindItem" || requirement._parent === "HandoverItem" && 
                    "_props" in requirement && "onlyFoundInRaid" in requirement._props)
                    {
                        requirement._props.onlyFoundInRaid = false;
                    }
                }
            }
        }
    
        //Enable all clothes available for both side
        if (this.config.traders.allClothesForEverySide)
        {
            for (let suit in suits)
            {
                if (this.other.IsThisIDaMod([suit]) === false)
                {
                    let suitData = suits[suit];
                    suitData._props.Side = ["Savage", "Bear", "Usec"];
                }
            }
        }
    
        //Enable all clothes for free
        if (this.config.traders.allClothesFree)
        {
            for (let trader in this.traders)
            {
                if (this.other.IsThisIDaMod([trader]) === false && this.traders[trader].suits)
                {

                    for (let file in this.traders[trader].suits)
                    {
                        let fileData = this.traders[trader].suits[file];
                        fileData.requirements.loyaltyLevel = 1;
                        fileData.requirements.profileLevel = 1;
                        fileData.requirements.standing = 0;
                        fileData.requirements.skillRequirements = [];
                        fileData.requirements.questRequirements = [];
                        fileData.requirements.itemRequirements = [];
                    }

                }
            }
        }
    
        //All cheap items on traders
        if (this.config.other.preWipeEvents.allTradersSellCheapItems)
        {
            for (const trader in this.traders)
            {
                for (const assort in this.traders[trader].assort.barter_scheme)
                {
                    let itemScheme = this.traders[trader].assort.barter_scheme[assort];
                    switch (itemScheme[0][0]._tpl)
                    {
                        case ItemHelper.Money.ROUBLES:
                        itemScheme[0][0].count = itemScheme[0][0].count * 0.01;
                        break;
                        case ItemHelper.Money.DOLLARS:
                        itemScheme[0][0].count = itemScheme[0][0].count * 0.1;
                        break;
                        case ItemHelper.Money.EUROS:
                        itemScheme[0][0].count = itemScheme[0][0].count * 0.05;
                        break;
                        default:
                        break;
                    }
                }
            }
        }
    
        //Change insurances return times
        if (this.config.traders.insuranceTime.activated)
        {
            if (this.config.traders.insuranceTime.prapor.activated)
            {
                this.traders["54cb50c76803fa8b248b4571"].base.insurance.min_return_hour =
                this.config.traders.insuranceTime.prapor.min;
                this.traders["54cb50c76803fa8b248b4571"].base.insurance.max_return_hour =
                this.config.traders.insuranceTime.prapor.max;
            }
            
            if (this.config.traders.insuranceTime.therapist.activated)
            {
                this.traders["54cb57776803fa99248b456e"].base.insurance.min_return_hour =
                this.config.traders.insuranceTime.therapist.min;
                this.traders["54cb57776803fa99248b456e"].base.insurance.max_return_hour =
                this.config.traders.insuranceTime.therapist.max;
            }
        }
    
        //Change the maximum time for insurance to be in mails
        if (this.config.traders.maxInsuranceStorageTime !== false)
        {
            this.traders["54cb50c76803fa8b248b4571"].base.insurance.max_storage_time =
            this.config.traders.maxInsuranceStorageTime;
            this.traders["54cb57776803fa99248b456e"].base.insurance.max_storage_time =
            this.config.traders.maxInsuranceStorageTime;
        }

        //UnlockAllItemsAtLL1
        if (this.config.traders.tradersChanges.unlockAllItemsAtLL1 && !this.config.traders.tradersChanges.allTraders4Stars) 
        {
            for (const traderID in this.traders)
            {
                if (traderID === "579dc571d53a0658a154fbec" || traderID === "ragfair")
                {
                    continue;
                }
                const loyaltyItems = this.traders[traderID].assort.loyal_level_items;
    
                for (const LLItem in loyaltyItems)
                {
                    loyaltyItems[LLItem] = 1;
                }
            }
        }
    
        //Remove assorts locked by quests
        if (this.config.traders.tradersChanges.removeItemsFromQuestLocks)
        {
            for (const traderID in this.traders)
            {
                if (this.traders[traderID].questassort && this.traders[traderID].questassort.success)
                {
                    this.traders[traderID].questassort.success = {};
                }
            }
        }
    
        if (this.config.traders.tradersChanges.allTraders4Stars)
        {
            for (const traderID in this.traders)
            {
                const loyaltyLevels = this.traders[traderID].base.loyaltyLevels;
                for (const level in loyaltyLevels)
                {   
                    const loyalty = loyaltyLevels[level];
                    loyalty.minLevel = 1;
                    loyalty.minSalesSum = 0;
                    loyalty.minStanding = 0;
                }
            }
        }
    }
}