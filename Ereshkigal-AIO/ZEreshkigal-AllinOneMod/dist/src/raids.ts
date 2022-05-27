import { inject, injectable } from "tsyringe";
import type { BossLocationSpawn } from "../types/models/eft/common/ILocationBase";
import type { DatabaseServer } from "../types/servers/DatabaseServer";
import { AIOConfigHandler } from "./AIOConfigHandler";
import { Other } from "./other";

@injectable()
export class Raids
{

    constructor(
        @inject("AIOConfigHandler") private configHandler: AIOConfigHandler,
        @inject("DatabaseServer") private database: DatabaseServer,
        @inject("AIOOther") private other: Other
    )
    {}

    public applyChanges(): void
    {
        const hideout = this.database.getTables().hideout;
        const locations = this.database.getTables().locations;

        //Change hideout fuel consumption
        if (this.configHandler.getConfig().hideout.changeFuelConsumptionRate !== false && typeof this.configHandler.getConfig().hideout.changeFuelConsumptionRate === "number")
        {
            hideout.settings.generatorFuelFlowRate = <number> this.configHandler.getConfig().hideout.changeFuelConsumptionRate;
        }

        //Enable hideout fast constructions
        if (this.configHandler.getConfig().hideout.fastHideoutConstruction)
        {
            for (const data in hideout.areas)
            {
                const areaData = hideout.areas[data];

                if (this.other.isThisIDaMod([areaData._id]) === false)
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
        if (this.configHandler.getConfig().hideout.fastHideoutProduction === true)
        {
            for (const data in hideout.production)
            {
                const productionData = hideout.production[data];

                if (this.other.isThisIDaMod([productionData._id]) === false)
                {
                    if (!productionData.continuous && productionData.productionTime > 10)
                    {
                        productionData.productionTime = 10;
                    }
                }
            }
        }

        //Scav cases modifications
        if (this.configHandler.getConfig().hideout.fastScavCase === true)
        {
            for (const scav in hideout.scavcase)
            {
                const caseData = hideout.scavcase[scav];

                if (this.other.isThisIDaMod([caseData._id]) === false)
                {
                    if (caseData.ProductionTime > 10)
                    {
                        caseData.ProductionTime = 10;
                    }
                }
            }
        }
        if (this.configHandler.getConfig().hideout.scavCasePriceReducer === true)
        {
            for (const scase in hideout.scavcase)
            {
                const caseData = hideout.scavcase[scase];

                if (this.other.isThisIDaMod([caseData._id]) === false)
                {
                    if (caseData.Requirements[0].count > 10 && (caseData.Requirements[0].templateId === "5449016a4bdc2d6f028b456f" || 
                        caseData.Requirements[0].templateId === "5696686a4bdc2da3298b456a" || 
                        caseData.Requirements[0].templateId === "569668774bdc2da2298b4568"))
                    {
                        caseData.Requirements[0].count = 10;
                    }
                }
            }
        }

        //Remove construction requirements
        if (this.configHandler.getConfig().hideout.removeConstructionRequirements)
        {
            for (const data in hideout.areas)
            {
                const areaData = hideout.areas[data];

                if (this.other.isThisIDaMod([areaData._id]) === false)
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
        if (this.configHandler.getConfig().raids.removeLabsKeycard)
        {
            locations.laboratory.base.AccessKeys = []
        }

        //Remove extracts restrictions
        if (this.configHandler.getConfig().raids.noExtractRestrictions)
        {
            for (const i in locations)
            {
                if (i !== "base")
                {
                    for (const x in locations[i].base.exits)
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
                            if (locations[i].base.exits[x].Id !== "")
                            {
                                locations[i].base.exits[x].Id = "";
                            }
                            if (locations[i].base.exits[x].Count !== 0)
                            {
                                locations[i].base.exits[x].Count = 0;
                            }
                            if (locations[i].base.exits[x].RequirementTip !== "")
                            {
                                locations[i].base.exits[x].RequirementTip = "";
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
        if (this.configHandler.getConfig().raids.allExtractionsAvailable)
        {
            for (const i in locations)
            {
                if (i !== "base")
                {
                    for (const x in locations[i].base.exits)
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
        if (this.configHandler.getConfig().raids.insuranceOnAllMaps)
        {
            for (const i in locations)
            {
                if (i !== "base")
                {
                    locations[i].base.Insurance = true;
                }
            }
        }

        //Make all bosses to 100% spawn
        if (this.configHandler.getConfig().raids.increasedBossChance)
        {
            for (const i in locations)
            {
                if (i !== "base")
                {
                    if (locations[i].base.BossLocationSpawn !== [])
                    {
                        for (const x in locations[i].base.BossLocationSpawn)
                        {
                            locations[i].base.BossLocationSpawn[x].BossChance = 100;
                        }
                    }
                }
            }
        }

        if (this.configHandler.getConfig().other.preWipeEvents.killaOnFactory)
        {
            const killaWave = this.other.createBossWave("bossKilla", 100, "followerBully", 0, locations.factory4_day.base.OpenZones);
            locations.factory4_day.base.BossLocationSpawn.push(killaWave);
            locations.factory4_night.base.BossLocationSpawn.push(killaWave);
        }

        if (this.configHandler.getConfig().other.preWipeEvents.allBossesOnReserve)
        {
            let bossWave = this.other.createBossWave("bossKilla", 100, "followerBully", 0, locations.rezervbase.base.OpenZones);
            locations.rezervbase.base.BossLocationSpawn.push(bossWave);
            bossWave = this.other.createBossWave("bossBully", 100, "followerBully", 4, locations.rezervbase.base.OpenZones);
            locations.rezervbase.base.BossLocationSpawn.push(bossWave);
            bossWave = this.other.createBossWave("bossKojaniy", 100, "followerKojaniy", 2, locations.rezervbase.base.OpenZones);
            locations.rezervbase.base.BossLocationSpawn.push(bossWave);
            bossWave = this.other.createBossWave("bossSanitar", 100, "followerSanitar", 2, locations.rezervbase.base.OpenZones);
            locations.rezervbase.base.BossLocationSpawn.push(bossWave);
        }

        if (this.configHandler.getConfig().other.preWipeEvents.gluhkarOnLabs)
        {
            const glugluWave: BossLocationSpawn = {
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

            glugluWave.BossZone = locations.laboratory.base.OpenZones;
            locations.laboratory.base.BossLocationSpawn.push(glugluWave);
        }

        //Extend raids to defined number
        if (this.configHandler.getConfig().raids.extendedRaid != false && typeof this.configHandler.getConfig().raids.extendedRaid === "number")
        {
            for (const map in locations)
            {
                if (map !== "base")
                {
                    locations[map].base.exit_access_time = this.configHandler.getConfig().raids.extendedRaid;
                    locations[map].base.escape_time_limit = this.configHandler.getConfig().raids.extendedRaid;
                }
            }
        }

        //Make all extractions of the map available regardless of the infill
        if (this.configHandler.getConfig().raids.extractionsExtended)
        {
            for (const map in locations)
            {
                switch (map) 
                {
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