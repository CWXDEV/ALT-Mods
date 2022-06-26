import { inject, injectable } from "tsyringe";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { AIOConfigHandler } from "./AIOConfigHandler";

@injectable()
export class Notifications
{
    constructor(
        @inject("WinstonLogger") private logger: ILogger,
        @inject("AIOConfigHandler") private configHandler: AIOConfigHandler
    )
    {}

    public sendNotifications(): void
    {

        const config = this.configHandler.getConfig();
        const locale = this.configHandler.getLocales();
        
        if (!config.other.hideWarningMessage)
        {
            this.logger.log("[AIO Mod INFORMATION]", "yellow");
            this.logger.info("Please read the README.PDF carefully as this has all the information you need.");
            this.logger.log("[AIO Mod INFORMATION]", "yellow");
        }

        //Items:
        // All Examined Items:
        if (config.items.allExaminedItems)
        {
            this.logger.info("AllInOne Mod: AllExaminedItems activated.");
            if (typeof config.items.allExaminedItems !== "boolean")
            {
                this.logger.warning(locale.items.allExaminedItems);
            }
        }

        // Weight Changes:
        if (config.items.weightChanges !== false)
        {
            this.logger.info("AllInOne Mod: WeightChanges activated.");
            if (typeof config.items.weightChanges !== "boolean" && config.items.weightChanges <= 0)
            {
                this.logger.warning(locale.items.weightChanges);
            }
        }

        // More Stack:
        if (config.items.moreStack !== false)
        {
            this.logger.info("AllInOne Mod: moreStack activated.");
            if (typeof config.items.moreStack !== "number")
            {
                this.logger.warning(locale.items.moreStack);
            }
        }

        // Equip Rigs With Armors:
        if (config.items.equipRigsWithArmors)
        {
            this.logger.info("AllInOne Mod: equipRigsWithArmors activated.");
            if (typeof config.items.equipRigsWithArmors !== "boolean")
            {
                this.logger.warning(locale.items.equipRigsWithArmors);
            }
        }

        // Force Money Stack:
        if (config.items.forceMoneyStack !== false)
        {
            this.logger.info("AllInOne Mod: forceMoneyStack activated.");
            if (typeof config.items.forceMoneyStack !== "number")
            {
                this.logger.warning(locale.items.forceMoneyStack);
            }
        }

        // Remove Secure Container Filters:
        if (config.items.removeSecureContainerFilters)
        {
            this.logger.info("AllInOne Mod: removeSecureContainerFilters activated.");
            if (typeof config.items.removeSecureContainerFilters !== "boolean")
            {
                this.logger.warning(locale.items.removeSecureContainerFilters);
            }
        }

        // Remove Backpack Restrictions:
        if (config.items.removeBackpacksRestrictions)
        {
            this.logger.info("AllInOne Mod: removeBackpacksRestrictions activated.");
            if (typeof config.items.removeBackpacksRestrictions !== "boolean")
            {
                this.logger.warning(locale.items.removeBackpacksRestrictions);
            }
        }

        // Remove Secure Container Filters:
        if (config.items.removeContainersRestrictions)
        {
            this.logger.info("AllInOne Mod: removeContainersRestrictions activated.");
            if (typeof config.items.removeContainersRestrictions !== "boolean")
            {
                this.logger.warning(locale.items.removeContainersRestrictions);
            }
        }

        // In Raid Moddable
        if (config.items.inRaidModdable)
        {
            this.logger.info("AllInOne Mod: inRaidModdable activated.");
            if (typeof config.items.inRaidModdable !== "boolean")
            {
                this.logger.warning(locale.items.inRaidModdable);
            }
        }

        // Increase Loot Exp
        if (config.items.increaseLootExp !== false)
        {
            this.logger.info("AllInOne Mod: increaseLootExp activated.");
            if (typeof config.items.increaseLootExp !== "number")
            {
                this.logger.warning(locale.items.increaseLootExp);
            }
        }

        // Increase Examine Exp
        if (config.items.increaseExamineExp !== false)
        {
            this.logger.info("AllInOne Mod: increaseExamineExp activated.");
            if (typeof config.items.increaseExamineExp !== "number")
            {
                this.logger.warning(locale.items.increaseExamineExp);
            }
        }

        // Remove Key Usage Number
        if (config.items.removeKeyUsageNumber)
        {
            this.logger.info("AllInOne Mod: removeKeyUsageNumber activated.");
            if (typeof config.items.removeKeyUsageNumber !== "boolean")
            {
                this.logger.warning(locale.items.removeKeyUsageNumber);
            }
        }

        // Stackable Barters
        if (config.items.stackableBarters.activated)
        {
            this.logger.info("AllInOne Mod: stackableBarters activated.");
            if (typeof config.items.stackableBarters.activated !== "boolean")
            {
                this.logger.warning(locale.items.stackableBarters);
            }
        }

        // Weapon Malf - Overheat
        if (config.items.weaponMalfunctions.overheat)
        {
            this.logger.info("AllInOne Mod: weaponMalfunctions.overheat activated.");
            if (typeof config.items.weaponMalfunctions.overheat !== "boolean")
            {
                this.logger.warning(locale.items.weaponMalfunctions.overheat);
            }
        }

        // Weapon Malf - jam
        if (config.items.weaponMalfunctions.jam)
        {
            this.logger.info("AllInOne Mod: weaponMalfunctions.jam activated.");
            if (typeof config.items.weaponMalfunctions.jam !== "boolean")
            {
                this.logger.warning(locale.items.weaponMalfunctions.jam);
            }
        }

        // Weapon Malf - slide
        if (config.items.weaponMalfunctions.slide)
        {
            this.logger.info("AllInOne Mod: weaponMalfunctions.slide activated.");
            if (typeof config.items.weaponMalfunctions.slide !== "boolean")
            {
                this.logger.warning(locale.items.weaponMalfunctions.slide);
            }
        }

        // Weapon Malf - misfire
        if (config.items.weaponMalfunctions.misfire)
        {
            this.logger.info("AllInOne Mod: weaponMalfunctions.misfire activated.");
            if (typeof config.items.weaponMalfunctions.misfire !== "boolean")
            {
                this.logger.warning(locale.items.weaponMalfunctions.misfire);
            }
        }

        // Weapon Malf - misfire
        if (config.items.weaponMalfunctions.feed)
        {
            this.logger.info("AllInOne Mod: weaponMalfunctions.feed activated.");
            if (typeof config.items.weaponMalfunctions.feed !== "boolean")
            {
                this.logger.warning(locale.items.weaponMalfunctions.feed);
            }
        }

        // Weapon Dura - Min
        if (config.items.weaponDurabilities.minimumSpawnDurability !== false)
        {
            this.logger.info("AllInOne Mod: weaponsDurabilities.minimumSpawnDurability activated.");
            if (typeof config.items.weaponDurabilities.minimumSpawnDurability !== "number")
            {
                this.logger.warning(locale.items.weaponDurabilities.minimumSpawnDurability);
            }
        }

        // Weapon Dura - Max
        if (config.items.weaponDurabilities.maximumSpawnDurability !== false)
        {
            this.logger.info("AllInOne Mod: weaponsDurabilities.maximumSpawnDurability activated.");
            if (typeof config.items.weaponDurabilities.maximumSpawnDurability !== "number")
            {
                this.logger.warning(locale.items.weaponDurabilities.maximumSpawnDurability);
            }
        }

        // Remove All Gear Penalties
        if (config.items.removeAllGearPenalties)
        {
            this.logger.info("AllInOne Mod: removeAllGearPenalties activated.");
            if (typeof config.items.removeAllGearPenalties !== "boolean")
            {
                this.logger.warning(locale.items.removeAllGearPenalties);
            }
        }
        
        // Remove Item Durability Burn
        if (config.items.removeItemDurabilityBurn)
        {
            this.logger.info("AllInOne Mod: removeItemDurabilityBurn activated.");
            if (typeof config.items.removeItemDurabilityBurn !== "boolean")
            {
                this.logger.warning(locale.items.removeItemDurabilityBurn);
            }
        }

        // Remove Bullet Weapon Durability Damage
        if (config.items.removeBulletWeaponDurabilityDamage)
        {
            this.logger.info("AllInOne Mod: removeBulletWeaponDurabilityDamage activated.");
            if (typeof config.items.removeBulletWeaponDurabilityDamage !== "boolean")
            {
                this.logger.warning(locale.items.removeBulletWeaponDurabilityDamage);
            }
        }

        // Remove Weapon Preset Restriction
        if (config.items.removeWeaponPresetRestriction)
        {
            this.logger.info("AllInOne Mod: removeWeaponPresetRestriction activated.");
            if (typeof config.items.removeWeaponPresetRestriction !== "boolean")
            {
                this.logger.warning(locale.items.removeWeaponPresetRestriction);
            }
        }

        // Change Indicidual Item Property
        if (config.items.changeIndividualItemProperty.activated)
        {
            this.logger.info("AllInOne Mod: changeIndividualItemProperty activated.");
            if (typeof config.items.changeIndividualItemProperty.activated !== "boolean")
            {
                this.logger.warning(locale.items.changeIndividualItemProperty.activated);
            }
        }

        // Hideout:
        // Change Fuel Consumption Rate
        if (config.hideout.changeFuelConsumptionRate !== false)
        {
            this.logger.info("AllInOne Mod: changeFuelConsumptionRate activated.");
            if (typeof config.hideout.changeFuelConsumptionRate !== "number")
            {
                this.logger.warning(locale.hideout.changeFuelConsumptionRate);
            }
        }

        // Fast Hideout Construction
        if (config.hideout.fastHideoutConstruction)
        {
            this.logger.info("AllInOne Mod: fastHideoutConstruction activated.");
            if (typeof config.hideout.fastHideoutConstruction !== "boolean")
            {
                this.logger.warning(locale.hideout.fastHideoutConstruction);
            }
        }

        // Fast Hideout Construction
        if (config.hideout.fastHideoutProduction)
        {
            this.logger.info("AllInOne Mod: fastHideoutProduction activated.");
            if (typeof config.hideout.fastHideoutProduction !== "boolean")
            {
                this.logger.warning(locale.hideout.fastHideoutProduction);
            }
        }

        // Fast Scav Case
        if (config.hideout.fastScavCase)
        {
            this.logger.info("AllInOne Mod: fastScavCase activated.");
            if (typeof config.hideout.fastScavCase !== "boolean")
            {
                this.logger.warning(locale.hideout.fastScavCase);
            }
        }

        // Scav Case Price Reducer
        if (config.hideout.scavCasePriceReducer)
        {
            this.logger.info("AllInOne Mod: scavCasePriceReducer activated.");
            if (typeof config.hideout.scavCasePriceReducer !== "boolean")
            {
                this.logger.warning(locale.hideout.scavCasePriceReducer);
            }
        }

        // Remove Construction Requirements
        if (config.hideout.removeConstructionRequirements)
        {
            this.logger.info("AllInOne Mod: removeConstructionRequirements activated.");
            if (typeof config.hideout.removeConstructionRequirements !== "boolean")
            {
                this.logger.warning(locale.hideout.removeConstructionRequirements);
            }
        }

        // Player:
        // Remove Scav Timer
        if (config.player.removeScavTimer)
        {
            this.logger.info("AllInOne Mod: removeScavTimer activated.");
            if (typeof config.player.removeScavTimer !== "boolean")
            {
                this.logger.warning(locale.player.removeScavTimer);
            }
        }

        // Change Skill Progression Multiplier
        if (config.player.changeSkillProgressionMultiplier !== false)
        {
            this.logger.info("AllInOne Mod: changeSkillProgressionMultiplier activated.");
            if (typeof config.player.changeSkillProgressionMultiplier !== "number")
            {
                this.logger.warning(locale.player.changeSkillProgressionMultiplier);
            }
        }

        // Change Weapon Skill Multiplier
        if (config.player.changeWeaponSkillMultiplier !== false)
        {
            this.logger.info("AllInOne Mod: changeWeaponSkillMultiplier activated.");
            if (typeof config.player.changeWeaponSkillMultiplier !== "number")
            {
                this.logger.warning(locale.player.changeWeaponSkillMultiplier);
            }
        }

        // Disable Skill Fatigue
        if (config.player.disableSkillFatigue !== false)
        {
            this.logger.info("AllInOne Mod: disableSkillFatigue activated.");
            if (typeof config.player.disableSkillFatigue !== "boolean" && (<string> config.player.disableSkillFatigue).toLowerCase() !== "custom")
            {
                this.logger.warning(locale.player.disableSkillFatigue);
            }
        }

        // skillFatiguePerPoint
        if (typeof config.player.skillFatiguePerPoint !== "number")
        {
            this.logger.warning(locale.player.skillFatiguePerPoint)
        }

        // skillFreshEffectiveness
        if (typeof config.player.skillFreshEffectiveness !== "number")
        {
            this.logger.warning(locale.player.skillFreshEffectiveness)
        }

        // skillFreshPoints
        if (typeof config.player.skillFreshPoints !== "number")
        {
            this.logger.warning(locale.player.skillFreshPoints)
        }

        // skillPointsBeforeFatigue
        if (typeof config.player.skillPointsBeforeFatigue !== "number")
        {
            this.logger.warning(locale.player.skillPointsBeforeFatigue)
        }

        // skillFatigueReset
        if (typeof config.player.skillFatigueReset !== "number")
        {
            this.logger.warning(locale.player.skillFatigueReset)
        }

        // Change Max Stamina
        if (config.player.changeMaxStamina !== false)
        {
            this.logger.info("AllInOne Mod: changeMaxStamina activated.");
            if (typeof config.player.changeMaxStamina !== "number")
            {
                this.logger.warning(locale.player.changeMaxStamina);
            }
        }

        // Unlimited Stamina
        if (config.player.unlimitedStamina)
        {
            this.logger.info("AllInOne Mod: unlimitedStamina activated.");
            if (typeof config.player.unlimitedStamina !== "boolean")
            {
                this.logger.warning(locale.player.unlimitedStamina);
            }
        }

        // Remove In Raid Restrictions
        if (config.player.removeInRaidsRestrictions)
        {
            this.logger.info("AllInOne Mod: removeInRaidsRestrictions activated.");
            if (typeof config.player.removeInRaidsRestrictions !== "boolean")
            {
                this.logger.warning(locale.player.removeInRaidsRestrictions);
            }
        }

        // Diable Fall Damage
        if (config.player.disableFallDamage)
        {
            this.logger.info("AllInOne Mod: disableFallDamage activated.");
            if (typeof config.player.disableFallDamage !== "boolean")
            {
                this.logger.warning(locale.player.disableFallDamage);
            }
        }

        // All Skills Master
        if (config.player.allSkillsMaster)
        {
            this.logger.info("AllInOne Mod: allSkillsMaster activated.");
            if (typeof config.player.allSkillsMaster !== "boolean")
            {
                this.logger.warning(locale.player.allSkillsMaster);
            }
        }

        // Enable Skill BotReload
        if (config.player.enableSkillBotReload)
        {
            this.logger.info("AllInOne Mod: enableSkillBotReload activated.");
            if (typeof config.player.enableSkillBotReload !== "boolean")
            {
                this.logger.warning(locale.player.enableSkillBotReload);
            }
        }

        // Enable Skill BotSound
        if (config.player.enableSkillBotSound)
        {
            this.logger.info("AllInOne Mod: enableSkillBotSound activated.");
            if (typeof config.player.enableSkillBotSound !== "boolean")
            {
                this.logger.warning(locale.player.enableSkillBotSound);
            }
        }

        // Remove Scav Karma
        if (config.player.removeScavKarma)
        {
            this.logger.info("AllInOne Mod: removeScavKarma activated.");
            if (typeof config.player.removeScavKarma !== "boolean")
            {
                this.logger.warning(locale.player.removeScavKarma);
            }
        }

        // Energy Drain Rate
        if (config.player.energyDrainRate !== false)
        {
            this.logger.info("AllInOne Mod: energyDrainRate activated.");
            if (typeof config.player.energyDrainRate !== "number")
            {
                this.logger.warning(locale.player.energyDrainRate);
            }
        }

        // Energy Drain Time
        if (config.player.energyDrainTime !== false)
        {
            this.logger.info("AllInOne Mod: energyDrainTime activated.");
            if (typeof config.player.energyDrainTime !== "number")
            {
                this.logger.warning(locale.player.energyDrainTime);
            }
        }

        // Hydratation Drain Rate
        if (config.player.hydrationDrainRate !== false)
        {
            this.logger.info("AllInOne Mod: hydratationDrainRate activated.");
            if (typeof config.player.hydrationDrainRate !== "number")
            {
                this.logger.warning(locale.player.hydrationDrainRate);
            }
        }

        // Hydratation Drain Time
        if (config.player.hydrationDrainTime !== false)
        {
            this.logger.info("AllInOne Mod: hydratationDrainTime activated.");
            if (typeof config.player.hydrationDrainTime !== "number")
            {
                this.logger.warning(locale.player.hydrationDrainTime);
            }
        }

        // Regeneration Loop Time
        if (config.player.regenerationLoopTime !== false)
        {
            this.logger.info("AllInOne Mod: regenerationLoopTime activated.");
            if (typeof config.player.regenerationLoopTime !== "number")
            {
                this.logger.warning(locale.player.regenerationLoopTime);
            }
        }

        // Energy Restoration
        if (config.player.energyRestoration !== false)
        {
            this.logger.info("AllInOne Mod: energyRestoration activated.");
            if (typeof config.player.energyRestoration !== "number")
            {
                this.logger.warning(locale.player.energyRestoration);
            }
        }

        // Hydration Restoration
        if (config.player.hydrationRestoration !== false)
        {
            this.logger.info("AllInOne Mod: hydrationRestoration activated.");
            if (typeof config.player.hydrationRestoration !== "number")
            {
                this.logger.warning(locale.player.hydrationRestoration);
            }
        }

        // Traders:
        // All Quests Available
        if (config.traders.allQuestsAvailable)
        {
            this.logger.info("AllInOne Mod: allQuestsAvailable activated.");
            if (typeof config.traders.allQuestsAvailable !== "boolean")
            {
                this.logger.warning(locale.traders.allQuestsAvailable);
            }
        }

        // All Clothes Free
        if (config.traders.allClothesFree)
        {
            this.logger.info("AllInOne Mod: allClothesFree activated.");
            if (typeof config.traders.allClothesFree !== "boolean")
            {
                this.logger.warning(locale.traders.allClothesFree);
            }
        }

        // All Clothes For Every Side
        if (config.traders.allClothesForEverySide)
        {
            this.logger.info("AllInOne Mod: allClothesForEverySide activated.");
            if (typeof config.traders.allClothesForEverySide !== "boolean")
            {
                this.logger.warning(locale.traders.allClothesForEverySide);
            }
        }

        // Change Flea Market Level
        if (config.traders.changeFleaMarketLvl !== false)
        {
            this.logger.info("AllInOne Mod: changeFleaMarketLvl activated.");
            if (typeof config.traders.changeFleaMarketLvl !== "number")
            {
                this.logger.warning(locale.traders.changeFleaMarketLvl);
            }
        }

        // Insurance Time Activated
        if (config.traders.insuranceTime.activated)
        {
            this.logger.info("AllInOne Mod: insuranceTime activated.")
            if (typeof config.traders.insuranceTime.activated !== "boolean")
            {
                this.logger.warning(locale.traders.insuranceTime.activated);
            }
        }

        // Insurance Time - Therapist
        if (config.traders.insuranceTime.therapist.activated)
        {
            this.logger.info("AllInOne Mod: InsuranceTime.Therapist activated.")
            if (typeof config.traders.insuranceTime.therapist.activated !== "boolean")
            {
                this.logger.warning(locale.traders.insuranceTime.therapist.activated);
            }
        }

        // Insurance Time - Prapor
        if (config.traders.insuranceTime.prapor.activated)
        {
            this.logger.info("AllInOne Mod: InsuranceTime.Prapor activated.")
            if (typeof config.traders.insuranceTime.prapor.activated !== "boolean")
            {
                this.logger.warning(locale.traders.insuranceTime.prapor.activated);
            }
        }

        // All Traders 4 Star - Unlock All Items At LL1
        if (config.traders.traderChanges.unlockAllItemsAtLL1 && config.traders.traderChanges.allTraders4Stars)
        {
            this.logger.warning(locale.traders.traderChanges.all4StarAndLL1);
        }
        else if (config.traders.traderChanges.allTraders4Stars)
        {
            this.logger.info("AllInOne Mod: allTraders4Stars activated.")
            if (typeof config.traders.traderChanges.allTraders4Stars !== "boolean")
            {
                this.logger.warning(locale.traders.traderChanges.allTraders4Stars);
            }
        }
        else if (config.traders.traderChanges.unlockAllItemsAtLL1)
        {
            this.logger.info("AllInOne Mod: unlockAllItemsAtLL1 activated.")
            if (typeof config.traders.traderChanges.unlockAllItemsAtLL1 !== "boolean")
            {
                this.logger.warning(locale.traders.traderChanges.unlockAllItemsAtLL1);
            }
        }

        // Remove Items From Quest Locks
        if (config.traders.traderChanges.removeItemsFromQuestLocks)
        {
            this.logger.info("AllInOne Mod: removeItemsFromQuestLocks activated.")
            if (typeof config.traders.traderChanges.removeItemsFromQuestLocks !== "boolean")
            {
                this.logger.warning(locale.traders.traderChanges.removeItemsFromQuestLocks);
            }
        }

        // Max Insurance Storage Time
        if (config.traders.maxInsuranceStorageTime)
        {
            this.logger.info("AllInOne Mod: maxInsuranceStorageTime activated.")
            if (typeof config.traders.maxInsuranceStorageTime !== "boolean" && config.traders.maxInsuranceStorageTime <= 0)
            {
                this.logger.warning(locale.traders.maxInsuranceStorageTime);
            }
        }

        // Prevent Fence Mastering
        if (config.traders.preventFenceMastering)
        {
            this.logger.info("AllInOne Mod: preventFenceMastering activated.")
            if (typeof config.traders.preventFenceMastering !== "boolean")
            {
                this.logger.warning(locale.traders.preventFenceMastering);
            }
        }

        // Remove FIR Condition On Quests
        if (config.traders.removeFIRConditionOnQuests)
        {
            this.logger.info("AllInOne Mod: removeFIRConditionOnQuests activated.")
            if (typeof config.traders.removeFIRConditionOnQuests !== "boolean")
            {
                this.logger.warning(locale.traders.removeFIRConditionOnQuests);
            }
        }

        // Raids:
        // No Extract Restrictions
        if (config.raids.noExtractRestrictions)
        {
            this.logger.info("AllInOne Mod: noExtractRestrictions activated.")
            if (typeof config.raids.noExtractRestrictions !== "boolean")
            {
                this.logger.warning(locale.raids.noExtractRestrictions);
            }
        }

        // All Extractions Avaliable
        if (config.raids.allExtractionsAvailable)
        {
            this.logger.info("AllInOne Mod: allExtractionsAvailable activated.")
            if (typeof config.raids.allExtractionsAvailable !== "boolean")
            {
                this.logger.warning(locale.raids.allExtractionsAvailable);
            }
        }

        // Increased Boss Chances
        if (config.raids.increasedBossChance)
        {
            this.logger.info("AllInOne Mod: increasedBossChance activated.")
            if (typeof config.raids.increasedBossChance !== "boolean")
            {
                this.logger.warning(locale.raids.increasedBossChance);
            }
        }

        // Extended Raid
        if (config.raids.extendedRaid !== false)
        {
            this.logger.info("AllInOne Mod: extendedRaid activated.");
            if (typeof config.raids.extendedRaid !== "number")
            {
                this.logger.warning(locale.raids.extendedRaid);
            }
        }

        // Remove Labs Keycard
        if (config.raids.removeLabsKeycard)
        {
            this.logger.info("AllInOne Mod: removeLabsKeycard activated.")
            if (typeof config.raids.removeLabsKeycard !== "boolean")
            {
                this.logger.warning(locale.raids.removeLabsKeycard);
            }
        }

        // Extractions Extended
        if (config.raids.extractionsExtended)
        {
            this.logger.info("AllInOne Mod: extractionsExtended activated.")
            if (typeof config.raids.extractionsExtended !== "boolean")
            {
                this.logger.warning(locale.raids.extractionsExtended);
            }
        }

        // Insurance On All Maps
        if (config.raids.insuranceOnAllMaps)
        {
            this.logger.info("AllInOne Mod: insuranceOnAllMaps activated.")
            if (typeof config.raids.insuranceOnAllMaps !== "boolean")
            {
                this.logger.warning(locale.raids.insuranceOnAllMaps);
            }
        }

        // Fixes:
        // Fins Choke Me Harder
        if (config.fixes.finsChokeMeHarder)
        {
            this.logger.info("AllInOne Mod: finsChokeMeHarder activated.")
            if (typeof config.fixes.finsChokeMeHarder !== "boolean")
            {
                this.logger.warning(locale.fixes.finsChokeMeHarder);
            }
        }

        // Chomps Raider Spawn Fix
        if (config.fixes.chompsRaiderSpawnFix)
        {
            this.logger.info("AllInOne Mod: chompsRaiderSpawnFix activated.")
            if (typeof config.fixes.chompsRaiderSpawnFix !== "boolean")
            {
                this.logger.warning(locale.fixes.chompsRaiderSpawnFix);
            }
        }

        // justNUs Even More Open Zones
        if (config.fixes.justNUsEvenMoreOpenZones)
        {
            this.logger.info("AllInOne Mod: justNUsEvenMoreOpenZones activated.")
            if (typeof config.fixes.justNUsEvenMoreOpenZones !== "boolean")
            {
                this.logger.warning(locale.fixes.justNUsEvenMoreOpenZones);
            }
        }

        // Other:
        // Pre Wipe Events:
        if (config.other.preWipeEvents.raidersOnAllMaps)
        {
            this.logger.info("AllInOne Mod: raidersOnAllMaps activated.")
            if (typeof config.other.preWipeEvents.raidersOnAllMaps !== "boolean")
            {
                this.logger.warning(locale.other.preWipeEvents.raidersOnAllMaps);
            }
        }

        // Killa On Factory:
        if (config.other.preWipeEvents.killaOnFactory)
        {
            this.logger.info("AllInOne Mod: killaOnFactory activated.")
            if (typeof config.other.preWipeEvents.killaOnFactory !== "boolean")
            {
                this.logger.warning(locale.other.preWipeEvents.killaOnFactory);
            }
        }

        // All Bosses On Reserve:
        if (config.other.preWipeEvents.allBossesOnReserve)
        {
            this.logger.info("AllInOne Mod: allBossesOnReserve activated.")
            if (typeof config.other.preWipeEvents.allBossesOnReserve !== "boolean")
            {
                this.logger.warning(locale.other.preWipeEvents.allBossesOnReserve);
            }
        }

        // All Traders Sell Cheap Items
        if (config.other.preWipeEvents.allTradersSellCheapItems)
        {
            this.logger.info("AllInOne Mod: allTradersSellCheapItems activated.")
            if (typeof config.other.preWipeEvents.allTradersSellCheapItems !== "boolean")
            {
                this.logger.warning(locale.other.preWipeEvents.allTradersSellCheapItems);
            }
        }

        // Make Obdolbos Powerful
        if (config.other.preWipeEvents.makeObdolbosPowerful)
        {
            this.logger.info("AllInOne Mod: makeObdolbosPowerful activated.")
            if (typeof config.other.preWipeEvents.makeObdolbosPowerful !== "boolean")
            {
                this.logger.warning(locale.other.preWipeEvents.makeObdolbosPowerful);
            }
        }

        // Gluhkar On Labs
        if (config.other.preWipeEvents.gluhkarOnLabs)
        {
            this.logger.info("AllInOne Mod: gluhkarOnLabs activated.")
            if (typeof config.other.preWipeEvents.gluhkarOnLabs !== "boolean")
            {
                this.logger.warning(locale.other.preWipeEvents.gluhkarOnLabs);
            }
        }

        // Heat Wave
        if (config.other.inGameEvents.heatWave)
        {
            this.logger.info("AllInOne Mod: heatWave activated.")
            if (typeof config.other.inGameEvents.heatWave !== "boolean")
            {
                this.logger.warning(locale.other.inGameEvents.heatWave);
            }
        }
    }
}