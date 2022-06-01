import type { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil"
import type { BotController } from "@spt-aki/controllers/BotController"
import type { IBotBase } from "@spt-aki/models/eft/common/tables/IBotBase";
import type { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { AIOConfigHandler } from "./AIOConfigHandler";
import { inject, injectable } from "tsyringe";

@injectable()
export class Other
{
    private dontNuke = [];

    constructor(
        @inject("AIOConfigHandler") private configHandler: AIOConfigHandler,
        @inject("HttpResponseUtil") private httpResponse: HttpResponseUtil,
        @inject("BotController") private botController: BotController
    )
    {}

    public applyChanges(): void
    {
        if (this.configHandler.getConfig().other.compatibilityMods.terragroupSpecialist) 
        {
            this.dontNuke.push("terragroupSpecialist")
        } 
        else if (this.configHandler.getConfig().other.compatibilityMods.coDMWMilSimCTSFOI) 
        {
            this.dontNuke.push("ctsfo1")
        } 
        else if (this.configHandler.getConfig().other.compatibilityMods.additionnalGearTan) 
        {
            this.dontNuke.push("AddGearTan")
        } 
        else if (this.configHandler.getConfig().other.compatibilityMods.additionnalGearBlack) 
        {
            this.dontNuke.push("AddGearBlack")
        } 
        else if (this.configHandler.getConfig().other.compatibilityMods.additionnalGearUntar) 
        {
            this.dontNuke.push("AddGearUntar")
        } 
        else if (this.configHandler.getConfig().other.compatibilityMods.additionnalClothing) 
        {
            this.dontNuke.push("AdditionalClothing")
        } 
        else if (this.configHandler.getConfig().other.compatibilityMods.andrudisQuestManiac) 
        {
            this.dontNuke.push("Ammo_Proficiency")
        }

    }

    public isThisIDaMod(id: string[]): boolean
    {
        if (this.dontNuke.length > 0) 
        {
            for (const mod in this.dontNuke) 
            {
                if (id.includes(this.dontNuke[mod])) 
                {
                    return true;
                } 
                else 
                {
                    return false
                }
            }
        } 
        else 
        {
            return false
        }
    }

    public spawnRaidersEverywhere(info: any): IGetBodyResponseData<IBotBase[]>
    {
        for (const type in info.conditions) 
        {
            const roles = info.conditions[type]
            roles.Role = "pmcBot"
            roles.Difficulty = "impossible"
        }

        return this.httpResponse.getBody(this.botController.generate(info));
    }

    public createBossWave(role: string, chance: number, followers: string, escortAmount: number, zones: string): any
    {
        return {
            "BossName": role,
            "BossChance": chance,
            "BossZone": zones,
            "BossPlayer": false,
            "BossDifficult": "normal",
            "BossEscortType": followers,
            "BossEscortDifficult": "normal",
            "BossEscortAmount": escortAmount,
            "Time": -1
        }
    }
}