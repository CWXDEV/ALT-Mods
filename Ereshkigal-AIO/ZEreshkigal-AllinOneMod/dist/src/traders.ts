import { inject, injectable } from "tsyringe";
import type { DatabaseServer } from "../types/servers/DatabaseServer";
import { AIOConfigHandler } from "./AIOConfigHandler";
import { Other } from "./other";
import { Money } from "../types/models/enums/Money"
import { Traders as eftTraders} from "../types/models/spt/helpers/Traders"

@injectable()
export class Traders
{
    private traders;

    constructor(
        @inject("AIOConfigHandler") private configHandler: AIOConfigHandler,
        @inject("DatabaseServer") private database: DatabaseServer,
        @inject("AIOOther") private other: Other
    )
    {}

    public applyChanges(): void
    {
        this.traders = this.database.getTables().traders;
        const quests = this.database.getTables().templates.quests;
        const suits = this.database.getTables().templates.customization;
    
        //Enable all the quests
        if (this.configHandler.getConfig().traders.allQuestsAvailable)
        {
            for (const id in quests)
            {
                if (this.other.isThisIDaMod([id]) === false)
                {
                    const questData = quests[id];
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
    
        if (this.configHandler.getConfig().traders.removeFIRConditionOnQuests)
        {
            for (const id in quests)
            {
                const condition = quests[id].conditions.AvailableForFinish;
                for (const requirements in condition)
                {
                    const requirement = condition[requirements];
                    if (requirement._parent === "FindItem" || requirement._parent === "HandoverItem" && 
                    "_props" in requirement && "onlyFoundInRaid" in requirement._props)
                    {
                        requirement._props.onlyFoundInRaid = false;
                    }
                }
            }
        }
    
        //Enable all clothes available for both side
        if (this.configHandler.getConfig().traders.allClothesForEverySide)
        {
            for (const suit in suits)
            {
                if (this.other.isThisIDaMod([suit]) === false)
                {
                    const suitData = suits[suit];
                    suitData._props.Side = ["Savage", "Bear", "Usec"];
                }
            }
        }
    
        //Enable all clothes for free
        if (this.configHandler.getConfig().traders.allClothesFree)
        {
            for (const trader in this.traders)
            {
                if (this.other.isThisIDaMod([trader]) === false && this.traders[trader].suits)
                {

                    for (const file in this.traders[trader].suits)
                    {
                        const fileData = this.traders[trader].suits[file];
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
        if (this.configHandler.getConfig().other.preWipeEvents.allTradersSellCheapItems)
        {
            for (const trader in this.traders)
            {
                for (const assort in this.traders[trader].assort.barter_scheme)
                {
                    const itemScheme = this.traders[trader].assort.barter_scheme[assort];
                    switch (itemScheme[0][0]._tpl)
                    {
                        case Money.ROUBLES:
                            itemScheme[0][0].count = itemScheme[0][0].count * 0.01;
                            break;
                        case Money.DOLLARS:
                            itemScheme[0][0].count = itemScheme[0][0].count * 0.1;
                            break;
                        case Money.EUROS:
                            itemScheme[0][0].count = itemScheme[0][0].count * 0.05;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    
        //Change insurances return times
        if (this.configHandler.getConfig().traders.insuranceTime.activated)
        {
            if (this.configHandler.getConfig().traders.insuranceTime.prapor.activated)
            {
                this.traders[eftTraders.PRAPOR].base.insurance.min_return_hour =
                this.configHandler.getConfig().traders.insuranceTime.prapor.min;
                this.traders[eftTraders.PRAPOR].base.insurance.max_return_hour =
                this.configHandler.getConfig().traders.insuranceTime.prapor.max;
            }
            
            if (this.configHandler.getConfig().traders.insuranceTime.therapist.activated)
            {
                this.traders[eftTraders.THERAPIST].base.insurance.min_return_hour =
                this.configHandler.getConfig().traders.insuranceTime.therapist.min;
                this.traders[eftTraders.THERAPIST].base.insurance.max_return_hour =
                this.configHandler.getConfig().traders.insuranceTime.therapist.max;
            }
        }
    
        //Change the maximum time for insurance to be in mails
        if (this.configHandler.getConfig().traders.maxInsuranceStorageTime !== false)
        {
            this.traders[eftTraders.PRAPOR].base.insurance.max_storage_time =
            this.configHandler.getConfig().traders.maxInsuranceStorageTime;
            this.traders[eftTraders.THERAPIST].base.insurance.max_storage_time =
            this.configHandler.getConfig().traders.maxInsuranceStorageTime;
        }

        //UnlockAllItemsAtLL1
        if (this.configHandler.getConfig().traders.traderChanges.unlockAllItemsAtLL1 && !this.configHandler.getConfig().traders.traderChanges.allTraders4Stars) 
        {
            for (const traderID in this.traders)
            {
                if (traderID === eftTraders.FENCE || traderID === "ragfair")
                {
                    continue;
                }
                const loyaltyItems = this.traders[traderID].assort.loyal_level_items;
    
                for (const lLItem in loyaltyItems)
                {
                    loyaltyItems[lLItem] = 1;
                }
            }
        }
    
        //Remove assorts locked by quests
        if (this.configHandler.getConfig().traders.traderChanges.removeItemsFromQuestLocks)
        {
            for (const traderID in this.traders)
            {
                if (this.traders[traderID].questassort && this.traders[traderID].questassort.success)
                {
                    this.traders[traderID].questassort.success = {};
                }
            }
        }
    
        if (this.configHandler.getConfig().traders.traderChanges.allTraders4Stars)
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