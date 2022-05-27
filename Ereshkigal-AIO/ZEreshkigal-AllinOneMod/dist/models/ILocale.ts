export interface ChangeIndividualItemProperty 
{
    activated: string;
}

export interface WeaponMalfunctions 
{
    overheat: string;
    jam: string;
    slide: string;
    misfire: string;
    feed: string;
}

export interface WeaponDurabilities 
{
    minimumSpawnDurability: string;
    maximumSpawnDurability: string;
}

export interface Items 
{
    default: string;//
    allExaminedItems: string;
    weightChanges: string;
    moreStack: string;
    equipRigsWithArmors: string;
    forceMoneyStack: string;
    removeSecureContainerFilters: string;
    removeBackpacksRestrictions: string;
    removeContainersRestrictions: string;
    inRaidModdable: string;
    increaseLootExp: string;
    increaseExamineExp: string;
    removeKeyUsageNumber: string;
    stackableBarters: string;
    removeAllGearPenalties: string;
    removeItemDurabilityBurn: string;
    removeBulletWeaponDurabilityDamage: string;
    removeWeaponPresetRestriction: string;
    changeIndividualItemProperty: ChangeIndividualItemProperty;
    weaponMalfunctions: WeaponMalfunctions;
    weaponDurabilities: WeaponDurabilities;
}

export interface Hideout 
{
    changeFuelConsumptionRate: string;
    fastHideoutConstruction: string;
    fastHideoutProduction: string;
    fastScavCase: string;
    scavCasePriceReducer: string;
    removeConstructionRequirements: string;
}

export interface Player 
{
    removeScavTimer: string;
    changeSkillProgressionMultiplier: string;
    changeWeaponSkillMultiplier: string;
    disableSkillFatigue: string;
    skillMinEffectiveness: string;
    skillFatiguePerPoint: string;
    skillFreshEffectiveness: string;
    skillFreshPoints: string;
    skillPointsBeforeFatigue: string;
    skillFatigueReset: string;
    changeMaxStamina: string;
    unlimitedStamina: string;
    removeInRaidsRestrictions: string;
    allSkillsMaster: string;
    removeScavKarma: string;
    enableSkillBotReload: string;
    enableSkillBotSound: string;
    disableFallDamage: string;
    energyDrainRate: string;
    energyDrainTime: string;
    hydrationDrainRate: string;
    hydrationDrainTime: string;
    regenerationLoopTime: string;
    energyRestoration: string;
    hydrationRestoration: string;
}

export interface Therapist 
{
    activated: string;
}

export interface Prapor 
{
    activated: string;
}

export interface InsuranceTime 
{
    activated: string;
    therapist: Therapist;
    prapor: Prapor;
}

export interface TraderChanges 
{
    allTraders4Stars: string;
    unlockAllItemsAtLL1: string;
    removeItemsFromQuestLocks: string;
    all4StarAndLL1: string;
}

export interface Traders 
{
    allQuestsAvailable: string;
    allClothesFree: string;
    allClothesForEverySide: string;
    changeFleaMarketLvl: string;
    insuranceTime: InsuranceTime;
    traderChanges: TraderChanges;
    maxInsuranceStorageTime: string;
    preventFenceMastering: string;
    removeFIRConditionOnQuests: string;
}

export interface Raids 
{
    noExtractRestrictions: string;
    allExtractionsAvailable: string;
    increasedBossChance: string;
    extendedRaid: string;
    removeLabsKeycard: string;
    extractionsExtended: string;
    insuranceOnAllMaps: string;
}

export interface PreWipeEvents 
{
    raidersOnAllMaps: string;
    killaOnFactory: string;
    allBossesOnReserve: string;
    allTradersSellCheapItems: string;
    makeObdolbosPowerful: string;
    gluhkarOnLabs: string;
}

export interface Other 
{
    preWipeEvents: PreWipeEvents;
    inGameEvents: InGameEvents;
}

export interface InGameEvents 
{
    heatWave: string; 
}

export interface Fixes 
{
    finsChokeMeHarder: string;
    chompsRaiderSpawnFix: string;
    justNUsEvenMoreOpenZones: string;
}

export interface ILocale 
{
    items: Items;
    hideout: Hideout;
    player: Player;
    traders: Traders;
    raids: Raids;
    other: Other;
    fixes: Fixes;
}

