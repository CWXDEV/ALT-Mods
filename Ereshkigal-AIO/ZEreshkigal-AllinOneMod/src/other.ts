import type { ILogger } from "../types/models/spt/utils/ILogger";
import type { HttpResponseUtil } from "../types/utils/HttpResponseUtil"
import type { BotController } from "../types/controllers/BotController"
import { IBotBase } from "../types/models/eft/common/tables/IBotBase";
import { IGetBodyResponseData } from "../types/models/eft/httpResponse/IGetBodyResponseData";
import { IConfig } from "../models/IConfig";

export class Other
{
    private dontNuke = [];

    constructor(
        private config: IConfig,
        private httpResponse: HttpResponseUtil,
        private botController: BotController
        )
    {}

    public ApplyChanges(): void
    {
        if (this.config.other.compatibilityMods.terragroupSpecialist) 
        {
            this.dontNuke.push("terragroupSpecialist")
        } 
        else if (this.config.other.compatibilityMods.coDMWMilSimCTSFOI) 
        {
            this.dontNuke.push("ctsfo1")
        } 
        else if (this.config.other.compatibilityMods.additionnalGearTan) 
        {
            this.dontNuke.push("AddGearTan")
        } 
        else if (this.config.other.compatibilityMods.additionnalGearBlack) 
        {
            this.dontNuke.push("AddGearBlack")
        } 
        else if (this.config.other.compatibilityMods.additionnalGearUntar) 
        {
            this.dontNuke.push("AddGearUntar")
        } 
        else if (this.config.other.compatibilityMods.additionnalClothing) 
        {
            this.dontNuke.push("AdditionalClothing")
        } 
        else if (this.config.other.compatibilityMods.andrudisQuestManiac) 
        {
            this.dontNuke.push("Ammo_Proficiency")
        }

    }

    public IsThisIDaMod(id: string[]): boolean
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

    public SpawnRaidersEverywhere(info: any): IGetBodyResponseData<IBotBase[]>
    {
        for (let type in info.conditions) {
            let roles = info.conditions[type]
            roles.Role = "pmcBot"
            roles.Difficulty = "impossible"
        }

        return this.httpResponse.getBody(this.botController.generate(info));
    }

    public CreateBossWave(role, chance, followers, escortAmount, zones): any
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