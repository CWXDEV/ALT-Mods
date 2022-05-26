import { IConfig } from "../models/IConfig";
import { DatabaseServer } from "../types/servers/DatabaseServer";

export class Fixes
{
    constructor(
        private config: IConfig,
        private database: DatabaseServer
        )
    {}

    public ApplyChanges(): void
    {
        const items = this.database.getTables().templates.items;

        const maps = {
            "bigmap": "ZoneBrige,ZoneCrossRoad,ZoneDormitory,ZoneGasStation,ZoneFactoryCenter,ZoneFactorySide,ZoneOldAZS,ZoneSnipeBrige,ZoneSnipeTower,ZoneSnipeFactory,ZoneBlockPost,ZoneBlockPostSniper,ZoneBlockPostSniper3,ZoneBlockPost,ZoneTankSquare,ZoneWade,ZoneCustoms,ZoneScavBase",
            "laboratory": "BotZoneFloor1,BotZoneFloor2,BotZoneBasement",
            "rezervbase": "ZoneRailStrorage,ZonePTOR1,ZonePTOR2,ZoneBarrack,ZoneBunkerStorage,ZoneSubStorage,ZoneSubCommand",
            "woods": "ZoneRedHouse,ZoneWoodCutter,ZoneHouse,ZoneBigRocks,ZoneRoad,ZoneMiniHouse,ZoneScavBase2,ZoneBrokenVill,ZoneClearVill,ZoneHighRocks",
            "shoreline": "ZoneSanatorium1,ZoneSanatorium2,ZonePassFar,ZonePassClose,ZoneTunnel,ZoneStartVillage,ZoneBunker,ZoneGreenHouses,ZoneIsland,ZoneGasStation,ZoneMeteoStation,ZonePowerStation,ZoneBusStation,ZoneRailWays,ZonePort,ZoneForestTruck,ZoneForestSpawn,ZoneForestGasStation",
            "lighthouse": "Zone_TreatmentContainers,Zone_LongRoad,Zone_Blockpost,Zone_TreatmentBeach,Zone_Hellicopter,Zone_RoofContainers,Zone_Village,Zone_OldHouse,Zone_RoofRocks,Zone_DestroyedHouse,Zone_Chalet,Zone_SniperPeak,Zone_RoofBeach,Zone_Containers,Zone_TreatmentRocks,Zone_Rocks"
        }
        const labsBosses = this.database.getTables().locations.laboratory.base.BossLocationSpawn;
        const reserveBosses = this.database.getTables().locations.rezervbase.base.BossLocationSpawn;

        // Fin's Choke Me Harder
        if (this.config.fixes.finsChokeMeHarder)
        {
            for (let id in items)
		    {
			    if (items[id]._props && items[id]._props.ShotgunDispersion)
                {
                    items[id]._props.shotgunDispersion = items[id]._props.ShotgunDispersion;
                }
		    }
        }
        
        // Chomps Raider Spawn Fix
        if (this.config.fixes.chompsRaiderSpawnFix)
        {
            const spawn1 = labsBosses.find(x => x.TriggerId === "autoId_00008_EXFIL");
            if (spawn1)
            {
                spawn1.TriggerId = "00404";
            }

            const spawn2 = labsBosses.find(x => x.TriggerId === "autoId_00010_EXFIL");
            if (spawn2)
            {
                spawn2.TriggerId = "00409";
            }

            const spawn3 = reserveBosses.find(x => x.TriggerId === "00457");
            if (spawn3)
            {
                spawn3.TriggerId = "autoId_00632_EXFIL";
            }

            const spawn4 = reserveBosses.find(x => x.TriggerId === "00452");
            if (spawn4)
            {
                spawn4.TriggerId = "autoId_00000_D2_LEVER";
            }
        }

        // JustNU's EvenMoreOpenZones
        if (this.config.fixes.justNUsEvenMoreOpenZones)
        {
            for (let location in maps)
            {
                this.database.getTables().locations[location].base.OpenZones = maps[location];
            }
        }
    }
}