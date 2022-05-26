import { ProfileHelper } from "../types/helpers/ProfileHelper";
import { IPmcData } from "../types/models/eft/common/IPmcData";
import type { ILogger } from "../types/models/spt/utils/ILogger";
import { DatabaseServer } from "../types/servers/DatabaseServer";
import { HttpResponseUtil } from "../types/utils/HttpResponseUtil";

export class Player
{
    constructor(
        private logger: ILogger,
        private database: DatabaseServer,
        private config: any,
        private httpResponse: HttpResponseUtil
        )
    {}

    public ApplyChanges() 
    {
        const globals = this.database.getTables().globals.config;


        //Hydratation Drain rate
        if (typeof this.config.player.HydratationDrainRate === "number")
        {
            globals.Health.Effects.Existence.HydrationDamage = this.config.player.HydratationDrainRate
        }

        //Hydratation Drain Time
        if (typeof this.config.player.HydratationDrainTime === "number")
        {
            globals.Health.Effects.Existence.HydrationLoopTime = this.config.player.HydratationDrainTime
        }

        //Energy Drain Rate
        if (typeof this.config.player.EnergyDrainRate === "number")
        {
            globals.Health.Effects.Existence.EnergyDamage = this.config.player.EnergyDrainRate
        }

        //Energy Drain Time
        if (typeof this.config.player.EnergyDrainTime === "number")
        {
            globals.Health.Effects.Existence.EnergyLoopTime = this.config.player.EnergyDrainTime
        }

        //RegenerationLoopTime
        if (typeof this.config.player.RegenerationLoopTime === "number")
        {
            globals.Health.Effects.Regeneration.LoopTime = this.config.player.RegenerationLoopTime
        }
 
        //Energy recovery in hideout
        if (typeof this.config.player.EnergyRestoration === "number")
        {
            globals.Health.Effects.Regeneration.Energy = this.config.player.EnergyRestoration
        }
        //Hydration recovery in hideout
        if (typeof this.config.player.HydrationRestoration === "number")
        {
            globals.Health.Effects.Regeneration.Hydration = this.config.player.HydrationRestoration
        }    

        //Remove scav timer
        if (this.config.player.RemoveScavTimer)
        {
            globals.SavagePlayCooldown = 1;
        }

        //Change skills progression multiplier
        if (this.config.player.ChangeSkillProgressionMultiplier !== false && typeof this.config.player.ChangeSkillProgressionMultiplier == "number")
        {
            globals.SkillsSettings.SkillProgressRate = this.config.player.ChangeSkillProgressionMultiplier;
        }

        //Change weapons skill multiplier
        if (this.config.player.ChangeWeaponSkillMultiplier !== false && typeof this.config.player.ChangeWeaponSkillMultiplier == "number")
        {
            globals.SkillsSettings.WeaponSkillProgressRate = this.config.player.ChangeWeaponSkillMultiplier;
        }

        //Change fleamarket mini level
        if (this.config.traders.ChangeFleaMarketLvl !== false && typeof this.config.traders.ChangeFleaMarketLvl == "number")
        {
            globals.RagFair.minUserLevel = this.config.traders.ChangeFleaMarketLvl;
        }

        //Change in raids restrictions
        if (this.config.player.RemoveInRaidsRestrictions)
        {
            globals.RestrictionsInRaid = []
        }

        //Remove fall damages
        if (this.config.player.DisableFallDamage)
        {
            globals.Health.Falling.SafeHeight = 200
            globals.Health.Falling.DamagePerMeter = 0
        }

        //Change staminas (unlimited or no)
        if (typeof this.config.player.ChangeMaxStamina == "number" && !this.config.player.UnlimitedStamina)
        {
            globals.Stamina.Capacity = this.config.player.ChangeMaxStamina
        }
        else if (!this.config.player.ChangeMaxStamina && this.config.player.UnlimitedStamina)
        {
            globals.Stamina.Capacity = 500,
            globals.Stamina.BaseRestorationRate = 500;
            globals.Stamina.StaminaExhaustionCausesJiggle = false;
            globals.Stamina.StaminaExhaustionStartsBreathSound = false;
            globals.Stamina.StaminaExhaustionRocksCamera = false;
            globals.Stamina.SprintDrainRate = 0;
            globals.Stamina.JumpConsumption = 0;
            globals.Stamina.AimDrainRate = 0;
            globals.Stamina.SitToStandConsumption = 0;
        }

        if (this.config.player.DisableSkillFatigue === true)
        {
            globals.SkillMinEffectiveness = 1;
            globals.SkillFatiguePerPoint = 0;
            globals.SkillFreshEffectiveness = 1.0;
        }
        else if (this.config.player.DisableSkillFatigue === "Custom")
        {
            globals.SkillMinEffectiveness = this.config.player.SkillMinEffectiveness;
            globals.SkillFatiguePerPoint = this.config.player.SkillFatiguePerPoint;
            globals.SkillFreshEffectiveness = this.config.player.SkillFreshEffectiveness;
            globals.SkillFreshPoints = this.config.player.SkillFreshPoints;
            globals.SkillPointsBeforeFatigue = this.config.player.SkillPointsBeforeFatigue;
            globals.SkillFatigueReset = this.config.player.SkillFatigueReset;
        }

        //PreventScavKarma
        if (this.config.player.RemoveScavKarma == true)
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

    public maxSkills(sessionID: string, profileHelper: ProfileHelper): any
    {
        let pmcData: IPmcData = null

        if (sessionID) 
        {
            pmcData = profileHelper.getPmcProfile(sessionID);
        }

        if (pmcData !== null)
        {
            if (pmcData.Skills.Common.length > 0)
            {
                for (let skills in pmcData.Skills.Common)
                {
                    let skill = pmcData.Skills.Common[skills];
                    switch (skill.Id)
                    {
                        case "BotReload":
                            if (this.config.player.EnableSkillBotReload === true)
                            {
                                skill.Progress = 5100;
                            }
                            break;
                        case "BotSound":
                            if (this.config.player.EnableSkillBotSound === true)
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