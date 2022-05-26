import { IConfig } from "../models/IConfig";
import { ItemHelper } from "../types/helpers/ItemHelper";
import { BossLocationSpawn } from "../types/models/eft/common/ILocationBase";
import { DatabaseServer } from "../types/servers/DatabaseServer";
import { Other } from "./other";

export class Raids
{
    constructor(
        private config: IConfig,
        private database: DatabaseServer,
        private other: Other
        )
    {}

    public ApplyChanges()
    {
        const hideout = this.database.getTables().hideout
        const locations = this.database.getTables().locations;
        const botList = this.database.getTables().bots.types

        //Change hideout fuel consumption
        if (this.config.hideout.changeFuelConsumptionRate !== false && typeof this.config.hideout.changeFuelConsumptionRate === "number")
        {
            hideout.settings.generatorFuelFlowRate = this.config.hideout.changeFuelConsumptionRate;
        }

        //Enable hideout fast constructions
        if (this.config.hideout.fastHideoutConstruction)
        {
            for (const data in hideout.areas)
            {
                let areaData = hideout.areas[data];

                if (this.other.IsThisIDaMod([areaData._id]) === false)
                {
                    for (const i in areaData.stages)
                    {
                        if (areaData.stages[i].constructionTime > 0)
                        {
                            areaData.stages[i].constructionTime = 1;
                        }
                    }
                }
            }
        }

        //Enable fast hideout production
        if (this.config.hideout.fastHideoutProduction === true)
        {
            for (const data in hideout.production)
            {
                let productionData = hideout.production[data];

                if (this.other.IsThisIDaMod([productionData._id]) === false)
                {
                    if (!productionData.continuous && productionData.productionTime > 10)
                    {
                        productionData.productionTime = 10;
                    }
                }
            }
        }

        //Scav cases modifications
        if (this.config.hideout.fastScavCase === true)
        {
            for (const scav in hideout.scavcase)
            {
                let caseData = hideout.scavcase[scav];

                if (this.other.IsThisIDaMod([caseData._id]) === false)
                {
                    if (caseData.ProductionTime > 10)
                    {
                        caseData.ProductionTime = 10;
                    }
                }
            }
        }
        if (this.config.hideout.scavCasePriceReducer === true)
        {
            for (const scase in hideout.scavcase)
            {
                let caseData = hideout.scavcase[scase];

                if (this.other.IsThisIDaMod([caseData._id]) === false)
                {
                    if (caseData.Requirements[0].count > 10 && (caseData.Requirements[0].templateId === ItemHelper.Money.ROUBLES || 
                        caseData.Requirements[0].templateId === ItemHelper.Money.DOLLARS || 
                        caseData.Requirements[0].templateId === ItemHelper.Money.EUROS))
                    {
                        caseData.Requirements[0].count = 10;
                    }
                }
            }
        }

        //Remove construction requirements
        if (this.config.hideout.removeConstructionRequirements)
        {
            for (const data in hideout.areas)
            {
                let areaData = hideout.areas[data];

                if (this.other.IsThisIDaMod([areaData._id]) === false)
                {
                    for (const i in areaData.stages)
                    {
                        if (areaData.stages[i].requirements !== undefined)
                        {
                            areaData.stages[i].requirements = [];
                        }

                    }
                }
            }
        }

        //Remove labs entry keycard
        if (this.config.raids.removeLabsKeycard)
        {
            locations.laboratory.base.AccessKeys = []
        }

        //Remove extracts restrictions
        if (this.config.raids.noExtractRestrictions)
        {
            for (let i in locations)
            {
                if (i !== "base")
                {
                    for (let x in locations[i].base.exits)
                    {
                        if (locations[i].base.exits[x].Name !== "EXFIL_Train" && 
                            !locations[i].base.exits[x].Name.includes("lab") || 
                            locations[i].base.exits[x].Name === "lab_Vent")
                            {
                            if (locations[i].base.exits[x].PassageRequirement !== "None")
                            {
                                locations[i].base.exits[x].PassageRequirement = "None";
                            }
                            if (locations[i].base.exits[x].ExfiltrationType !== "Individual")
                            {
                                locations[i].base.exits[x].ExfiltrationType = "Individual";
                            }
                            if (locations[i].base.exits[x].Id !== '')
                            {
                                locations[i].base.exits[x].Id = '';
                            }
                            if (locations[i].base.exits[x].Count !== 0)
                            {
                                locations[i].base.exits[x].Count = 0;
                            }
                            if (locations[i].base.exits[x].RequirementTip !== '')
                            {
                                locations[i].base.exits[x].RequirementTip = '';
                            }
                            if (locations[i].base.exits[x].RequiredSlot)
                            {
                                delete locations[i].base.exits[x].RequiredSlot;
                            }
                        }
                    }
                }
            }
        }

        //Make all extractions available to extract
        if (this.config.raids.allExtractionsAvailable)
        {
            for (let i in locations)
            {
                if (i !== "base")
                {
                    for (let x in locations[i].base.exits)
                    {
                        if (locations[i].base.exits[x].Name !== "EXFIL_Train")
                        {
                            if (locations[i].base.exits[x].Chance !== 100)
                            {
                                locations[i].base.exits[x].Chance = 100;
                            }
                        }
                    }
                }
            }
        }

        //Make all maps have functional insurance
        if (this.config.raids.insuranceOnAllMaps)
        {
            for (let i in locations)
            {
                if (i !== "base")
                {
                    locations[i].base.Insurance = true;
                }
            }
        }

        //Make all bosses to 100% spawn
        if (this.config.raids.increasedBossChance)
        {
            for (let i in locations)
            {
                if (i !== "base")
                {
                    if (locations[i].base.BossLocationSpawn !== [])
                    {
                        for (let x in locations[i].base.BossLocationSpawn)
                        {
                            locations[i].base.BossLocationSpawn[x].BossChance = 100;
                        }
                    }
                }
            }
        }

        if (this.config.other.preWipeEvents.killaOnFactory)
        {
            const KillaWave = this.other.CreateBossWave("bossKilla", 100, "followerBully", 0, locations.factory4_day.base.OpenZones);
            locations.factory4_day.base.BossLocationSpawn.push(KillaWave);
            locations.factory4_night.base.BossLocationSpawn.push(KillaWave);
        }

        if (this.config.other.preWipeEvents.allBossesOnReserve)
        {
           let bossWave = this.other.CreateBossWave("bossKilla", 100, "followerBully", 0, locations.rezervbase.base.OpenZones);
           locations.rezervbase.base.BossLocationSpawn.push(bossWave);
           bossWave = this.other.CreateBossWave("bossBully", 100, "followerBully", 4, locations.rezervbase.base.OpenZones);
           locations.rezervbase.base.BossLocationSpawn.push(bossWave);
           bossWave = this.other.CreateBossWave("bossKojaniy", 100, "followerKojaniy", 2, locations.rezervbase.base.OpenZones);
           locations.rezervbase.base.BossLocationSpawn.push(bossWave);
           bossWave = this.other.CreateBossWave("bossSanitar", 100, "followerSanitar", 2, locations.rezervbase.base.OpenZones);
           locations.rezervbase.base.BossLocationSpawn.push(bossWave);
        }

        if (this.config.other.preWipeEvents.gluhkarOnLabs)
        {
            const GlugluWave: BossLocationSpawn = {
                "BossName": "bossGluhar",
                "BossChance": 43,
                "BossZone": "ZoneRailStrorage,ZoneRailStrorage,ZoneRailStrorage,ZonePTOR1,ZonePTOR2,ZoneBarrack,ZoneBarrack,ZoneBarrack,ZoneSubStorage",
                "BossPlayer": false,
                "BossDifficult": "normal",
                "BossEscortType": "followerGluharAssault",
                "BossEscortDifficult": "normal",
                "BossEscortAmount": "0",
                "Time": -1,
                "TriggerId": "",
                "TriggerName": "",
                "Supports": [
                    {
                        "BossEscortType": "followerGluharAssault",
                        "BossEscortDifficult": [
                            "normal"
                        ],
                        "BossEscortAmount": "2"
                    },
                    {
                        "BossEscortType": "followerGluharSecurity",
                        "BossEscortDifficult": [
                            "normal"
                        ],
                        "BossEscortAmount": "2"
                    },
                    {
                        "BossEscortType": "followerGluharScout",
                        "BossEscortDifficult": [
                            "normal"
                        ],
                        "BossEscortAmount": "2"
                    }
                ]
            }

            GlugluWave.BossZone = locations.laboratory.base.OpenZones;
            locations.laboratory.base.BossLocationSpawn.push(GlugluWave);
        }

        //Extend raids to defined number
        if (this.config.raids.extendedRaid != false && typeof this.config.raids.extendedRaid === "number")
        {
            for (let map in locations)
            {
                if (map !== "base")
                {
                    locations[map].base.exit_access_time = this.config.raids.extendedRaid;
                    locations[map].base.escape_time_limit = this.config.raids.extendedRaid;
                }
            }
        }

        //Make all extractions of the map available regardless of the infill
        if (this.config.raids.extractionsExtended)
        {
            for (let map in locations)
            {
                switch (map) {
                    case "base":
                        break;
                    case "bigmap":
                        for (const extract in locations[map].base.exits)
                        {
                            locations[map].base.exits[extract].EntryPoints = "Customs,Boiler Tanks";
                        }
                        break;
                    case "interchange":
                        for (const extract in locations[map].base.exits)
                        {
                            locations[map].base.exits[extract].EntryPoints = "MallSE,MallNW";
                        }
                        break;
                    case "shoreline":
                        for (const extract in locations[map].base.exits)
                        {
                            locations[map].base.exits[extract].EntryPoints = "Village,Riverside";
                        }
                        break;
                    case "woods":
                        for (const extract in locations[map].base.exits)
                        {
                            locations[map].base.exits[extract].EntryPoints = "House,Old Station";
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }
}