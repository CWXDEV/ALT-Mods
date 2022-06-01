import { inject, injectable } from "tsyringe";
import type { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import type { IPmcData } from "@spt-aki//models/eft/common/IPmcData";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import type { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import type { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { AIOConfigHandler } from "./AIOConfigHandler";

@injectable()
export class Player
{
    constructor(
        @inject("WinstonLogger") private logger: ILogger,
        @inject("AIOConfigHandler") private configHandler: AIOConfigHandler,
        @inject("DatabaseServer") private database: DatabaseServer,
        @inject("HttpResponseUtil") private httpResponse: HttpResponseUtil,
        @inject("ProfileHelper") private profileHelper: ProfileHelper
    )
    {}

    public applyChanges(): void
    {
        const globals = this.database.getTables().globals.config;


        //Hydratation Drain rate
        if (typeof this.configHandler.getConfig().player.hydrationDrainRate === "number")
        {
            globals.Health.Effects.Existence.HydrationDamage = <number> this.configHandler.getConfig().player.hydrationDrainRate;
        }

        //Hydratation Drain Time
        if (typeof this.configHandler.getConfig().player.hydrationDrainTime === "number")
        {
            globals.Health.Effects.Existence.HydrationLoopTime = <number> this.configHandler.getConfig().player.hydrationDrainTime;
        }

        //Energy Drain Rate
        if (typeof this.configHandler.getConfig().player.energyDrainRate === "number")
        {
            globals.Health.Effects.Existence.EnergyDamage = <number> this.configHandler.getConfig().player.energyDrainRate;
        }

        //Energy Drain Time
        if (typeof this.configHandler.getConfig().player.energyDrainTime === "number")
        {
            globals.Health.Effects.Existence.EnergyLoopTime = <number> this.configHandler.getConfig().player.energyDrainTime;
        }

        //RegenerationLoopTime
        if (typeof this.configHandler.getConfig().player.regenerationLoopTime === "number")
        {
            globals.Health.Effects.Regeneration.LoopTime = <number> this.configHandler.getConfig().player.regenerationLoopTime;
        }
 
        //Energy recovery in hideout
        if (typeof this.configHandler.getConfig().player.energyRestoration === "number")
        {
            globals.Health.Effects.Regeneration.Energy = <number> this.configHandler.getConfig().player.energyRestoration;
        }
        //Hydration recovery in hideout
        if (typeof this.configHandler.getConfig().player.hydrationRestoration === "number")
        {
            globals.Health.Effects.Regeneration.Hydration = <number> this.configHandler.getConfig().player.hydrationRestoration;
        }    

        //Remove scav timer
        if (this.configHandler.getConfig().player.removeScavTimer)
        {
            globals.SavagePlayCooldown = 1;
        }

        //Change skills progression multiplier
        if (this.configHandler.getConfig().player.changeSkillProgressionMultiplier !== false && typeof this.configHandler.getConfig().player.changeSkillProgressionMultiplier == "number")
        {
            globals.SkillsSettings.SkillProgressRate = <number> this.configHandler.getConfig().player.changeSkillProgressionMultiplier;
        }

        //Change weapons skill multiplier
        if (this.configHandler.getConfig().player.changeWeaponSkillMultiplier !== false && typeof this.configHandler.getConfig().player.changeWeaponSkillMultiplier == "number")
        {
            globals.SkillsSettings.WeaponSkillProgressRate = <number> this.configHandler.getConfig().player.changeWeaponSkillMultiplier;
        }

        //Change fleamarket mini level
        if (this.configHandler.getConfig().traders.changeFleaMarketLvl !== false && typeof this.configHandler.getConfig().traders.changeFleaMarketLvl == "number")
        {
            globals.RagFair.minUserLevel = <number> this.configHandler.getConfig().traders.changeFleaMarketLvl;
        }

        //Change in raids restrictions
        if (this.configHandler.getConfig().player.removeInRaidsRestrictions)
        {
            globals.RestrictionsInRaid = []
        }

        //Remove fall damages
        if (this.configHandler.getConfig().player.disableFallDamage)
        {
            globals.Health.Falling.SafeHeight = 200
            globals.Health.Falling.DamagePerMeter = 0
        }

        //Change staminas (unlimited or no)
        if (typeof this.configHandler.getConfig().player.changeMaxStamina == "number" && !this.configHandler.getConfig().player.unlimitedStamina)
        {
            globals.Stamina.Capacity = <number> this.configHandler.getConfig().player.changeMaxStamina
        }
        else if (!this.configHandler.getConfig().player.changeMaxStamina && this.configHandler.getConfig().player.unlimitedStamina)
        {
            globals.Stamina.Capacity = 500;
            globals.Stamina.BaseRestorationRate = 500;
            globals.Stamina.StaminaExhaustionCausesJiggle = false;
            globals.Stamina.StaminaExhaustionStartsBreathSound = false;
            globals.Stamina.StaminaExhaustionRocksCamera = false;
            globals.Stamina.SprintDrainRate = 0;
            globals.Stamina.JumpConsumption = 0;
            globals.Stamina.AimDrainRate = 0;
            globals.Stamina.SitToStandConsumption = 0;
        }

        if (this.configHandler.getConfig().player.disableSkillFatigue === true)
        {
            globals.SkillMinEffectiveness = 1;
            globals.SkillFatiguePerPoint = 0;
            globals.SkillFreshEffectiveness = 1.0;
        }
        else if (this.configHandler.getConfig().player.disableSkillFatigue === "Custom")
        {
            globals.SkillMinEffectiveness = this.configHandler.getConfig().player.skillMinEffectiveness;
            globals.SkillFatiguePerPoint = this.configHandler.getConfig().player.skillFatiguePerPoint;
            globals.SkillFreshEffectiveness = this.configHandler.getConfig().player.skillFreshEffectiveness;
            globals.SkillFreshPoints = this.configHandler.getConfig().player.skillFreshPoints;
            globals.SkillPointsBeforeFatigue = this.configHandler.getConfig().player.skillPointsBeforeFatigue;
            globals.SkillFatigueReset = this.configHandler.getConfig().player.skillFatigueReset;
        }

        //PreventScavKarma
        if (this.configHandler.getConfig().player.removeScavKarma == true)
        {
            const types = this.database.getTables().bots.types
            for (const bots in types)
            {
                if (types[bots].experience.standingForKill < 0 && types[bots].experience.standingForKill > 0)
                {
                    types[bots].experience.standingForKill = 0
                }
                if (types[bots].experience.aggressorBonus < 0 && types[bots].experience.aggressorBonus > 0)
                {
                    types[bots].experience.aggressorBonus = 0
                }
            }
        }
    }

    public maxSkills(sessionID: string): any
    {
        let pmcData: IPmcData = null

        if (sessionID) 
        {
            pmcData = this.profileHelper.getPmcProfile(sessionID);
        }

        if (pmcData !== null)
        {
            if (pmcData.Skills.Common.length > 0)
            {
                for (const skills in pmcData.Skills.Common)
                {
                    const skill = pmcData.Skills.Common[skills];
                    switch (skill.Id)
                    {
                        case "BotReload":
                            if (this.configHandler.getConfig().player.enableSkillBotReload === true)
                            {
                                skill.Progress = 5100;
                            }
                            break;
                        case "BotSound":
                            if (this.configHandler.getConfig().player.enableSkillBotSound === true)
                            {
                                skill.Progress = 5100;
                            }
                            break;
                        default:
                            skill.Progress = 5100;
                            break;
                    }
                }
            }
            else
            {
                this.logger.error("No skills for PMC to master, skipping");
            }
        }
        return this.httpResponse.nullResponse();
    }
}