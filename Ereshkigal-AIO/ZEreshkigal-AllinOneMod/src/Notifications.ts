import { IConfig } from "../models/IConfig";
import { ILocale } from "../models/ILocale";
import type { ILogger } from "../types/models/spt/utils/ILogger";
import { Other } from "./other";

export class Notifications
{
    constructor(
        private logger: ILogger,
        private config: IConfig,
        private locale: ILocale,
        private other: Other
        )
    {}

    public SendNotifications()
    {
        if (!this.config.other.hideWarningMessage)
        {
            this.logger.info("[AIO Mod INFORMATION]");
            this.logger.info("Please read the README.PDF carefully as this has all the information you need.");
            this.logger.info("[AIO Mod INFORMATION]");
        }

        //Items:
        // All Examined Items:
        if (this.config.items.allExaminedItems)
        {
            this.logger.info("AllInOne Mod: AllExaminedItems activated.");
            if (typeof this.config.items.allExaminedItems !== "boolean")
            {
                this.logger.warning(this.locale.items.allExaminedItems);
            }
        }

        // Weight Changes:
        if (this.config.items.weightChanges !== false)
        {
            this.logger.info("AllInOne Mod: WeightChanges activated.");
            if (typeof this.config.items.weightChanges !== "boolean" && this.config.items.weightChanges <= 0)
            {
                this.logger.warning(this.locale.items.weightChanges);
            }
        }

        // More Stack:
        if (this.config.items.moreStack !== false)
        {
            this.logger.info("AllInOne Mod: moreStack activated.");
            if (typeof this.config.items.moreStack !== "number")
            {
                this.logger.warning(this.locale.items.moreStack);
            }
        }

        // Equip Rigs With Armors:
        if (this.config.items.equipRigsWithArmors)
        {
            this.logger.info("AllInOne Mod: equipRigsWithArmors activated.");
            if (typeof this.config.items.equipRigsWithArmors !== "boolean")
            {
                this.logger.warning(this.locale.items.equipRigsWithArmors);
            }
        }

        // Force Money Stack:
        if (this.config.items.forceMoneyStack !== false)
        {
            this.logger.info("AllInOne Mod: forceMoneyStack activated.");
            if (typeof this.config.items.forceMoneyStack !== "number")
            {
                this.logger.warning(this.locale.items.forceMoneyStack);
            }
        }

        // Remove Secure Container Filters:
        if (this.config.items.removeSecureContainerFilters)
        {
            this.logger.info("AllInOne Mod: removeSecureContainerFilters activated.");
            if (typeof this.config.items.removeSecureContainerFilters !== "boolean")
            {
                this.logger.warning(this.locale.items.removeSecureContainerFilters);
            }
        }

        // Remove Backpack Restrictions:
        if (this.config.items.removeBackpacksRestrictions)
        {
            this.logger.info("AllInOne Mod: removeBackpacksRestrictions activated.");
            if (typeof this.config.items.removeBackpacksRestrictions !== "boolean")
            {
                this.logger.warning(this.locale.items.removeBackpacksRestrictions);
            }
        }

        // Remove Secure Container Filters:
        if (this.config.items.removeContainersRestrictions)
        {
            this.logger.info("AllInOne Mod: removeContainersRestrictions activated.");
            if (typeof this.config.items.removeContainersRestrictions !== "boolean")
            {
                this.logger.warning(this.locale.items.removeContainersRestrictions);
            }
        }

        // In Raid Moddable
        if (this.config.items.inRaidModdable)
        {
            this.logger.info("AllInOne Mod: inRaidModdable activated.");
            if (typeof this.config.items.inRaidModdable !== "boolean")
            {
                this.logger.warning(this.locale.items.inRaidModdable);
            }
        }

        // Increase Loot Exp
        if (this.config.items.increaseLootExp !== false)
        {
            this.logger.info("AllInOne Mod: increaseLootExp activated.");
            if (typeof this.config.items.increaseLootExp !== "number")
            {
                this.logger.warning(this.locale.items.increaseLootExp);
            }
        }

        // Increase Examine Exp
        if (this.config.items.increaseExamineExp !== false)
        {
            this.logger.info("AllInOne Mod: increaseExamineExp activated.");
            if (typeof this.config.items.increaseExamineExp !== "number")
            {
                this.logger.warning(this.locale.items.increaseExamineExp);
            }
        }

        // Remove Key Usage Number
        if (this.config.items.removeKeyUsageNumber)
        {
            this.logger.info("AllInOne Mod: removeKeyUsageNumber activated.");
            if (typeof this.config.items.removeKeyUsageNumber !== "boolean")
            {
                this.logger.warning(this.locale.items.removeKeyUsageNumber);
            }
        }

        // Stackable Barters
        if (this.config.items.stackableBarters)
        {
            this.logger.info("AllInOne Mod: stackableBarters activated.");
            if (typeof this.config.items.stackableBarters !== "boolean")
            {
                this.logger.warning(this.locale.items.stackableBarters);
            }
        }

        // Weapon Malf - Overheat
        if (this.config.items.weaponMalfunctions.overheat)
        {
            this.logger.info("AllInOne Mod: weaponMalfunctions.overheat activated.");
            if (typeof this.config.items.weaponMalfunctions.overheat !== "boolean")
            {
                this.logger.warning(this.locale.items.weaponMalfunctions.overheat);
            }
        }

        // Weapon Malf - jam
        if (this.config.items.weaponMalfunctions.jam)
        {
            this.logger.info("AllInOne Mod: weaponMalfunctions.jam activated.");
            if (typeof this.config.items.weaponMalfunctions.jam !== "boolean")
            {
                this.logger.warning(this.locale.items.weaponMalfunctions.jam);
            }
        }

        // Weapon Malf - slide
        if (this.config.items.weaponMalfunctions.slide)
        {
            this.logger.info("AllInOne Mod: weaponMalfunctions.slide activated.");
            if (typeof this.config.items.weaponMalfunctions.slide !== "boolean")
            {
                this.logger.warning(this.locale.items.weaponMalfunctions.slide);
            }
        }

        // Weapon Malf - misfire
        if (this.config.items.weaponMalfunctions.misfire)
        {
            this.logger.info("AllInOne Mod: weaponMalfunctions.misfire activated.");
            if (typeof this.config.items.weaponMalfunctions.misfire !== "boolean")
            {
                this.logger.warning(this.locale.items.weaponMalfunctions.misfire);
            }
        }

        // Weapon Malf - misfire
        if (this.config.items.weaponMalfunctions.feed)
        {
            this.logger.info("AllInOne Mod: weaponMalfunctions.feed activated.");
            if (typeof this.config.items.weaponMalfunctions.feed !== "boolean")
            {
                this.logger.warning(this.locale.items.weaponMalfunctions.feed);
            }
        }

        // Weapon Dura - Min
        if (this.config.items.weaponDurabilities.minimumSpawnDurability !== false)
        {
            this.logger.info("AllInOne Mod: weaponsDurabilities.minimumSpawnDurability activated.");
            if (typeof this.config.items.weaponDurabilities.minimumSpawnDurability !== "number")
            {
                this.logger.warning(this.locale.items.weaponDurabilities.minimumSpawnDurability);
            }
        }

        // Weapon Dura - Max
        if (this.config.items.weaponDurabilities.maximumSpawnDurability !== false)
        {
            this.logger.info("AllInOne Mod: weaponsDurabilities.maximumSpawnDurability activated.");
            if (typeof this.config.items.weaponDurabilities.maximumSpawnDurability !== "number")
            {
                this.logger.warning(this.locale.items.weaponDurabilities.maximumSpawnDurability);
            }
        }

        // Remove All Gear Penalties
        if (this.config.items.removeAllGearPenalties)
        {
            this.logger.info("AllInOne Mod: removeAllGearPenalties activated.");
            if (typeof this.config.items.removeAllGearPenalties !== "boolean")
            {
                this.logger.warning(this.locale.items.removeAllGearPenalties);
            }
        }
        
        // Remove Item Durability Burn
        if (this.config.items.removeItemDurabilityBurn)
        {
            this.logger.info("AllInOne Mod: removeItemDurabilityBurn activated.");
            if (typeof this.config.items.removeItemDurabilityBurn !== "boolean")
            {
                this.logger.warning(this.locale.items.removeItemDurabilityBurn);
            }
        }

        // Remove Bullet Weapon Durability Damage
        if (this.config.items.removeBulletWeaponDurabilityDamage)
        {
            this.logger.info("AllInOne Mod: removeBulletWeaponDurabilityDamage activated.");
            if (typeof this.config.items.removeBulletWeaponDurabilityDamage !== "boolean")
            {
                this.logger.warning(this.locale.items.removeBulletWeaponDurabilityDamage);
            }
        }

        // Remove Weapon Preset Restriction
        if (this.config.items.removeWeaponPresetRestriction)
        {
            this.logger.info("AllInOne Mod: removeWeaponPresetRestriction activated.");
            if (typeof this.config.items.removeWeaponPresetRestriction !== "boolean")
            {
                this.logger.warning(this.locale.items.removeWeaponPresetRestriction);
            }
        }

        // Change Indicidual Item Property
        if (this.config.items.changeIndividualItemProperty.activated)
        {
            this.logger.info("AllInOne Mod: changeIndividualItemProperty activated.");
            if (typeof this.config.items.changeIndividualItemProperty.activated !== "boolean")
            {
                this.logger.warning(this.locale.items.changeIndividualItemProperty.activated);
            }
        }

        // Hideout:
        // Change Fuel Consumption Rate
        if (this.config.hideout.changeFuelConsumptionRate !== false)
        {
            this.logger.info("AllInOne Mod: changeFuelConsumptionRate activated.");
            if (typeof this.config.items.weaponDurabilities.maximumSpawnDurability !== "number")
            {
                this.logger.warning(this.locale.hideout.changeFuelConsumptionRate);
            }
        }

        // Fast Hideout Construction
        if (this.config.hideout.fastHideoutConstruction)
        {
            this.logger.info("AllInOne Mod: fastHideoutConstruction activated.");
            if (typeof this.config.hideout.fastHideoutConstruction !== "boolean")
            {
                this.logger.warning(this.locale.hideout.fastHideoutConstruction);
            }
        }

        // Fast Hideout Construction
        if (this.config.hideout.fastHideoutProduction)
        {
            this.logger.info("AllInOne Mod: fastHideoutProduction activated.");
            if (typeof this.config.hideout.fastHideoutProduction !== "boolean")
            {
                this.logger.warning(this.locale.hideout.fastHideoutProduction);
            }
        }

        // Fast Scav Case
        if (this.config.hideout.fastScavCase)
        {
            this.logger.info("AllInOne Mod: fastScavCase activated.");
            if (typeof this.config.hideout.fastScavCase !== "boolean")
            {
                this.logger.warning(this.locale.hideout.fastScavCase);
            }
        }

        // Scav Case Price Reducer
        if (this.config.hideout.scavCasePriceReducer)
        {
            this.logger.info("AllInOne Mod: scavCasePriceReducer activated.");
            if (typeof this.config.hideout.scavCasePriceReducer !== "boolean")
            {
                this.logger.warning(this.locale.hideout.scavCasePriceReducer);
            }
        }

        // Remove Construction Requirements
        if (this.config.hideout.removeConstructionRequirements)
        {
            this.logger.info("AllInOne Mod: removeConstructionRequirements activated.");
            if (typeof this.config.hideout.removeConstructionRequirements !== "boolean")
            {
                this.logger.warning(this.locale.hideout.removeConstructionRequirements);
            }
        }

        // Player:
        // Remove Scav Timer
        if (this.config.player.removeScavTimer)
        {
            this.logger.info("AllInOne Mod: removeScavTimer activated.");
            if (typeof this.config.player.removeScavTimer !== "boolean")
            {
                this.logger.warning(this.config.player.removeScavTimer);
            }
        }

        // Change Skill Progression Multiplier
        if (this.config.player.changeSkillProgressionMultiplier !== false)
        {
            this.logger.info("AllInOne Mod: changeSkillProgressionMultiplier activated.");
            if (typeof this.config.player.changeSkillProgressionMultiplier !== "number")
            {
                this.logger.warning(this.locale.player.changeSkillProgressionMultiplier);
            }
        }

        // Change Weapon Skill Multiplier
        if (this.config.player.changeWeaponSkillMultiplier !== false)
        {
            this.logger.info("AllInOne Mod: changeWeaponSkillMultiplier activated.");
            if (typeof this.config.player.changeWeaponSkillMultiplier !== "number")
            {
                this.logger.warning(this.locale.player.changeWeaponSkillMultiplier);
            }
        }

        // Disable Skill Fatigue
        if (this.config.player.disableSkillFatigue !== false)
        {
            this.logger.info("AllInOne Mod: disableSkillFatigue activated.");
            if (typeof this.config.player.disableSkillFatigue !== "boolean" && this.config.player.disableSkillFatigue.toLowerCase() !== "custom")
            {
                this.logger.warning(this.locale.player.disableSkillFatigue);
            }
        }

        // skillFatiguePerPoint
        if (typeof this.config.player.skillFatiguePerPoint !== "number")
        {
            this.logger.warning(this.locale.player.skillFatiguePerPoint)
        }

        // skillFreshEffectiveness
        if (typeof this.config.player.skillFreshEffectiveness !== "number")
        {
            this.logger.warning(this.locale.player.skillFreshEffectiveness)
        }

        // skillFreshPoints
        if (typeof this.config.player.skillFreshPoints !== "number")
        {
            this.logger.warning(this.locale.player.skillFreshPoints)
        }

        // skillPointsBeforeFatigue
        if (typeof this.config.player.skillPointsBeforeFatigue !== "number")
        {
            this.logger.warning(this.locale.player.skillPointsBeforeFatigue)
        }

        // skillFatigueReset
        if (typeof this.config.player.skillFatigueReset !== "number")
        {
            this.logger.warning(this.locale.player.skillFatigueReset)
        }

        // Change Max Stamina
        if (this.config.player.changeMaxStamina !== false)
        {
            this.logger.info("AllInOne Mod: changeMaxStamina activated.");
            if (typeof this.config.player.changeMaxStamina !== "number")
            {
                this.logger.warning(this.locale.player.changeMaxStamina);
            }
        }

        // Unlimited Stamina
        if (this.config.player.unlimitedStamina)
        {
            this.logger.info("AllInOne Mod: unlimitedStamina activated.");
            if (typeof this.config.player.unlimitedStamina !== "boolean")
            {
                this.logger.warning(this.locale.player.unlimitedStamina);
            }
        }

        // Remove In Raid Restrictions
        if (this.config.player.removeInRaidsRestrictions)
        {
            this.logger.info("AllInOne Mod: removeInRaidsRestrictions activated.");
            if (typeof this.config.player.removeInRaidsRestrictions !== "boolean")
            {
                this.logger.warning(this.locale.player.removeInRaidsRestrictions);
            }
        }

        // Diable Fall Damage
        if (this.config.player.disableFallDamage)
        {
            this.logger.info("AllInOne Mod: disableFallDamage activated.");
            if (typeof this.config.player.disableFallDamage !== "boolean")
            {
                this.logger.warning(this.locale.player.disableFallDamage);
            }
        }

        // All Skills Master
        if (this.config.player.allSkillsMaster)
        {
            this.logger.info("AllInOne Mod: allSkillsMaster activated.");
            if (typeof this.config.player.allSkillsMaster !== "boolean")
            {
                this.logger.warning(this.locale.player.allSkillsMaster);
            }
        }

        // Enable Skill BotReload
        if (this.config.player.enableSkillBotReload)
        {
            this.logger.info("AllInOne Mod: enableSkillBotReload activated.");
            if (typeof this.config.player.enableSkillBotReload !== "boolean")
            {
                this.logger.warning(this.locale.player.enableSkillBotReload);
            }
        }

        // Enable Skill BotSound
        if (this.config.player.enableSkillBotSound)
        {
            this.logger.info("AllInOne Mod: enableSkillBotSound activated.");
            if (typeof this.config.player.enableSkillBotSound !== "boolean")
            {
                this.logger.warning(this.locale.player.enableSkillBotSound);
            }
        }

        // Remove Scav Karma
        if (this.config.player.removeScavKarma)
        {
            this.logger.info("AllInOne Mod: removeScavKarma activated.");
            if (typeof this.config.player.removeScavKarma !== "boolean")
            {
                this.logger.warning(this.locale.player.removeScavKarma);
            }
        }

        // Energy Drain Rate
        if (this.config.player.energyDrainRate !== false)
        {
            this.logger.info("AllInOne Mod: energyDrainRate activated.");
            if (typeof this.config.player.energyDrainRate !== "number")
            {
                this.logger.warning(this.locale.player.energyDrainRate);
            }
        }

        // Energy Drain Time
        if (this.config.player.energyDrainTime !== false)
        {
            this.logger.info("AllInOne Mod: energyDrainTime activated.");
            if (typeof this.config.player.energyDrainTime !== "number")
            {
                this.logger.warning(this.locale.player.energyDrainTime);
            }
        }

        // Hydratation Drain Rate
        if (this.config.player.hydratationDrainRate !== false)
        {
            this.logger.info("AllInOne Mod: hydratationDrainRate activated.");
            if (typeof this.config.player.hydratationDrainRate !== "number")
            {
                this.logger.warning(this.locale.player.hydratationDrainRate);
            }
        }

        // Hydratation Drain Time
        if (this.config.player.hydratationDrainTime !== false)
        {
            this.logger.info("AllInOne Mod: hydratationDrainTime activated.");
            if (typeof this.config.player.hydratationDrainTime !== "number")
            {
                this.logger.warning(this.locale.player.hydratationDrainTime);
            }
        }

        // Regeneration Loop Time
        if (this.config.player.regenerationLoopTime !== false)
        {
            this.logger.info("AllInOne Mod: regenerationLoopTime activated.");
            if (typeof this.config.player.regenerationLoopTime !== "number")
            {
                this.logger.warning(this.locale.player.regenerationLoopTime);
            }
        }

        // Energy Restoration
        if (this.config.player.energyRestoration !== false)
        {
            this.logger.info("AllInOne Mod: energyRestoration activated.");
            if (typeof this.config.player.energyRestoration !== "number")
            {
                this.logger.warning(this.locale.player.energyRestoration);
            }
        }

        // Hydration Restoration
        if (this.config.player.hydrationRestoration !== false)
        {
            this.logger.info("AllInOne Mod: hydrationRestoration activated.");
            if (typeof this.config.player.hydrationRestoration !== "number")
            {
                this.logger.warning(this.locale.player.hydrationRestoration);
            }
        }

        // Traders:
        // All Quests Available
        if (this.config.traders.allQuestsAvailable)
        {
            this.logger.info("AllInOne Mod: removeScavKarma activated.");
            if (typeof this.config.traders.allQuestsAvailable !== "boolean")
            {
                this.logger.warning(this.locale.traders.allQuestsAvailable);
            }
        }

        // All Clothes Free
        if (this.config.traders.allClothesFree)
        {
            this.logger.info("AllInOne Mod: allClothesFree activated.");
            if (typeof this.config.traders.allClothesFree !== "boolean")
            {
                this.logger.warning(this.locale.traders.allClothesFree);
            }
        }

        // All Clothes For Every Side
        if (this.config.traders.allClothesForEverySide)
        {
            this.logger.info("AllInOne Mod: allClothesForEverySide activated.");
            if (typeof this.config.traders.allClothesForEverySide !== "boolean")
            {
                this.logger.warning(this.locale.traders.allClothesForEverySide);
            }
        }

        // Change Flea Market Level
        if (this.config.traders.changeFleaMarketLvl !== false)
        {
            this.logger.info("AllInOne Mod: changeFleaMarketLvl activated.");
            if (typeof this.config.traders.changeFleaMarketLvl !== "number")
            {
                this.logger.warning(this.locale.traders.changeFleaMarketLvl);
            }
        }

        // Insurance Time Activated
        if (this.config.traders.insuranceTime.activated)
        {
            this.logger.info("AllInOne Mod: insuranceTime activated.")
            if (typeof this.config.traders.insuranceTime.activated !== "boolean")
            {
                this.logger.warning(this.locale.traders.insuranceTime.activated);
            }
        }

        // Insurance Time - Therapist
        if (this.config.traders.insuranceTime.therapist.activated)
        {
            this.logger.info("AllInOne Mod: InsuranceTime.Therapist activated.")
            if (typeof this.config.traders.insuranceTime.therapist.activated !== "boolean")
            {
                this.logger.warning(this.locale.traders.insuranceTime.therapist.activated);
            }
        }

        // Insurance Time - Prapor
        if (this.config.traders.insuranceTime.prapor.activated)
        {
            this.logger.info("AllInOne Mod: InsuranceTime.Prapor activated.")
            if (typeof this.config.traders.insuranceTime.prapor.activated !== "boolean")
            {
                this.logger.warning(this.locale.traders.insuranceTime.prapor.activated);
            }
        }

        // All Traders 4 Star - Unlock All Items At LL1
        if (this.config.traders.tradersChanges.unlockAllItemsAtLL1 && this.config.traders.tradersChanges.allTraders4Stars)
        {
            this.logger.warning(this.locale.traders.tradersChanges.all4StarAndLL1);
        }
        else if (this.config.traders.tradersChanges.allTraders4Stars)
        {
            this.logger.info("AllInOne Mod: allTraders4Stars activated.")
            if (typeof this.config.traders.tradersChanges.allTraders4Stars !== "boolean")
            {
                this.logger.warning(this.locale.traders.tradersChanges.allTraders4Stars);
            }
        }
        else if (this.config.traders.tradersChanges.unlockAllItemsAtLL1)
        {
            this.logger.info("AllInOne Mod: unlockAllItemsAtLL1 activated.")
            if (typeof this.config.traders.tradersChanges.unlockAllItemsAtLL1 !== "boolean")
            {
                this.logger.warning(this.locale.traders.tradersChanges.unlockAllItemsAtLL1);
            }
        }

        // Remove Items From Quest Locks
        if (this.config.traders.tradersChanges.removeItemsFromQuestLocks)
        {
            this.logger.info("AllInOne Mod: removeItemsFromQuestLocks activated.")
            if (typeof this.config.traders.tradersChanges.removeItemsFromQuestLocks !== "boolean")
            {
                this.logger.warning(this.locale.traders.tradersChanges.removeItemsFromQuestLocks);
            }
        }

        // Max Insurance Storage Time
        if (this.config.traders.maxInsuranceStorageTime)
        {
            this.logger.info("AllInOne Mod: maxInsuranceStorageTime activated.")
            if (typeof this.config.traders.maxInsuranceStorageTime !== "boolean")
            {
                this.logger.warning(this.locale.traders.maxInsuranceStorageTime);
            }
        }

        // Max Insurance Storage Time
        if (this.config.traders.preventFenceMastering)
        {
            this.logger.info("AllInOne Mod: preventFenceMastering activated.")
            if (typeof this.config.traders.preventFenceMastering !== "boolean")
            {
                this.logger.warning(this.locale.traders.preventFenceMastering);
            }
        }

        // Remove FIR Condition On Quests
        if (this.config.traders.removeFIRConditionOnQuests)
        {
            this.logger.info("AllInOne Mod: removeFIRConditionOnQuests activated.")
            if (typeof this.config.traders.removeFIRConditionOnQuests !== "boolean")
            {
                this.logger.warning(this.locale.traders.removeFIRConditionOnQuests);
            }
        }

        // Raids:
        // No Extract Restrictions
        if (this.config.raids.noExtractRestrictions)
        {
            this.logger.info("AllInOne Mod: noExtractRestrictions activated.")
            if (typeof this.config.raids.noExtractRestrictions !== "boolean")
            {
                this.logger.warning(this.locale.raids.noExtractRestrictions);
            }
        }

        // All Extractions Avaliable
        if (this.config.raids.allExtractionsAvailable)
        {
            this.logger.info("AllInOne Mod: allExtractionsAvailable activated.")
            if (typeof this.config.raids.allExtractionsAvailable !== "boolean")
            {
                this.logger.warning(this.locale.raids.allExtractionsAvailable);
            }
        }

        // Increased Boss Chances
        if (this.config.raids.increasedBossChance)
        {
            this.logger.info("AllInOne Mod: increasedBossChance activated.")
            if (typeof this.config.raids.increasedBossChance !== "boolean")
            {
                this.logger.warning(this.locale.raids.increasedBossChance);
            }
        }

        // Extended Raid
        if (this.config.raids.extendedRaid !== false)
        {
            this.logger.info("AllInOne Mod: changeFleaMarketLvl activated.");
            if (typeof this.config.raids.extendedRaid !== "number")
            {
                this.logger.warning(this.locale.raids.extendedRaid);
            }
        }

        // Remove Labs Keycard
        if (this.config.raids.removeLabsKeycard)
        {
            this.logger.info("AllInOne Mod: removeLabsKeycard activated.")
            if (typeof this.config.raids.removeLabsKeycard !== "boolean")
            {
                this.logger.warning(this.locale.raids.removeLabsKeycard);
            }
        }

        // Extractions Extended
        if (this.config.raids.extractionsExtended)
        {
            this.logger.info("AllInOne Mod: extractionsExtended activated.")
            if (typeof this.config.raids.extractionsExtended !== "boolean")
            {
                this.logger.warning(this.locale.raids.extractionsExtended);
            }
        }

        // Insurance On All Maps
        if (this.config.raids.insuranceOnAllMaps)
        {
            this.logger.info("AllInOne Mod: insuranceOnAllMaps activated.")
            if (typeof this.config.raids.insuranceOnAllMaps !== "boolean")
            {
                this.logger.warning(this.locale.raids.insuranceOnAllMaps);
            }
        }

        // Fixes:
        // Fins Choke Me Harder
        if (this.config.fixes.finsChokeMeHarder)
        {
            this.logger.info("AllInOne Mod: finsChokeMeHarder activated.")
            if (typeof this.config.fixes.finsChokeMeHarder !== "boolean")
            {
                this.logger.warning(this.locale.fixes.finsChokeMeHarder);
            }
        }

        // Chomps Raider Spawn Fix
        if (this.config.fixes.chompsRaiderSpawnFix)
        {
            this.logger.info("AllInOne Mod: chompsRaiderSpawnFix activated.")
            if (typeof this.config.fixes.chompsRaiderSpawnFix !== "boolean")
            {
                this.logger.warning(this.locale.fixes.chompsRaiderSpawnFix);
            }
        }

        // justNUs Even More Open Zones
        if (this.config.fixes.justNUsEvenMoreOpenZones)
        {
            this.logger.info("AllInOne Mod: justNUsEvenMoreOpenZones activated.")
            if (typeof this.config.fixes.justNUsEvenMoreOpenZones !== "boolean")
            {
                this.logger.warning(this.locale.fixes.justNUsEvenMoreOpenZones);
            }
        }

        // Other:
        // Pre Wipe Events:
        if (this.config.other.preWipeEvents.raidersOnAllMaps)
        {
            this.logger.info("AllInOne Mod: raidersOnAllMaps activated.")
            if (typeof this.config.other.preWipeEvents.raidersOnAllMaps !== "boolean")
            {
                this.logger.warning(this.locale.other.preWipeEvents.raidersOnAllMaps);
            }
        }

        // Killa On Factory:
        if (this.config.other.preWipeEvents.killaOnFactory)
        {
            this.logger.info("AllInOne Mod: killaOnFactory activated.")
            if (typeof this.config.other.preWipeEvents.killaOnFactory !== "boolean")
            {
                this.logger.warning(this.locale.other.preWipeEvents.killaOnFactory);
            }
        }

        // All Bosses On Reserve:
        if (this.config.other.preWipeEvents.allBossesOnReserve)
        {
            this.logger.info("AllInOne Mod: allBossesOnReserve activated.")
            if (typeof this.config.other.preWipeEvents.allBossesOnReserve !== "boolean")
            {
                this.logger.warning(this.locale.other.preWipeEvents.allBossesOnReserve);
            }
        }

        // All Traders Sell Cheap Items
        if (this.config.other.preWipeEvents.allTradersSellCheapItems)
        {
            this.logger.info("AllInOne Mod: allTradersSellCheapItems activated.")
            if (typeof this.config.other.preWipeEvents.allTradersSellCheapItems !== "boolean")
            {
                this.logger.warning(this.locale.other.preWipeEvents.allTradersSellCheapItems);
            }
        }

        // Make Obdolbos Powerful
        if (this.config.other.preWipeEvents.makeObdolbosPowerful)
        {
            this.logger.info("AllInOne Mod: makeObdolbosPowerful activated.")
            if (typeof this.config.other.preWipeEvents.makeObdolbosPowerful !== "boolean")
            {
                this.logger.warning(this.locale.other.preWipeEvents.makeObdolbosPowerful);
            }
        }

        // Gluhkar On Labs
        if (this.config.other.preWipeEvents.gluhkarOnLabs)
        {
            this.logger.info("AllInOne Mod: gluhkarOnLabs activated.")
            if (typeof this.config.other.preWipeEvents.gluhkarOnLabs !== "boolean")
            {
                this.logger.warning(this.locale.other.preWipeEvents.gluhkarOnLabs);
            }
        }

        // Heat Wave
        if (this.config.other.inGameEvents.heatWave)
        {
            this.logger.info("AllInOne Mod: heatWave activated.")
            if (typeof this.config.other.inGameEvents.heatWave !== "boolean")
            {
                this.logger.warning(this.locale.other.inGameEvents.heatWave);
            }
        }
    }
}