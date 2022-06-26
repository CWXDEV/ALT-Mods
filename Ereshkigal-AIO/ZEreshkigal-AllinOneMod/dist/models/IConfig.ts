export interface StackableBarters 
{
    activated: boolean;
    battery: number;
    buildingMaterials: number;
    electronics: number;
    householdGoods: number;
    jewelry: number;
    medicalSupplies: number;
    lubricant: number;
    tools: number;
    other: number;
}

export interface WeaponMalfunctions 
{
    overheat: boolean;
    jam: boolean;
    slide: boolean;
    misfire: boolean;
    feed: boolean;
}

export interface WeaponDurabilities 
{
    minimumSpawnDurability: boolean | number;
    maximumSpawnDurability: boolean | number;
}

export interface ChangeIndividualItemProperty
{
    activated: boolean;
    itemList: any;
}
export interface Items 
{
    allExaminedItems: boolean;
    weightChanges: boolean | number;
    moreStack: boolean | number;
    equipRigsWithArmors: boolean;
    forceMoneyStack: boolean | number;
    removeSecureContainerFilters: boolean;
    removeBackpacksRestrictions: boolean;
    removeContainersRestrictions: boolean;
    inRaidModdable: boolean;
    increaseLootExp: boolean | number;
    increaseExamineExp: boolean | number;
    removeKeyUsageNumber: boolean;
    stackableBarters: StackableBarters;
    weaponMalfunctions: WeaponMalfunctions;
    weaponDurabilities: WeaponDurabilities;
    removeAllGearPenalties: boolean;
    removeItemDurabilityBurn: boolean;
    removeBulletWeaponDurabilityDamage: boolean;
    removeWeaponPresetRestriction: boolean;
    changeIndividualItemProperty: ChangeIndividualItemProperty;
}

export interface Hideout 
{
    changeFuelConsumptionRate: boolean | number;
    fastHideoutConstruction: boolean;
    fastHideoutProduction: boolean;
    fastScavCase: boolean;
    scavCasePriceReducer: boolean;
    removeConstructionRequirements: boolean;
}

export interface Player 
{
    removeScavTimer: boolean;
    changeSkillProgressionMultiplier: boolean | number;
    changeWeaponSkillMultiplier: boolean | number;
    disableSkillFatigue: boolean | string;
    skillMinEffectiveness: number;
    skillFatiguePerPoint: number;
    skillFreshEffectiveness: number;
    skillFreshPoints: number;
    skillPointsBeforeFatigue: number;
    skillFatigueReset: number;
    changeMaxStamina: boolean | number;
    unlimitedStamina: boolean;
    removeInRaidsRestrictions: boolean;
    disableFallDamage: boolean;
    allSkillsMaster: boolean;
    enableSkillBotReload: boolean;
    enableSkillBotSound: boolean;
    removeScavKarma: boolean;
    energyDrainRate: boolean | number;
    energyDrainTime: boolean | number;
    hydrationDrainRate: boolean | number;
    hydrationDrainTime: boolean | number;
    regenerationLoopTime: boolean | number;
    energyRestoration: boolean | number;
    hydrationRestoration: boolean | number;
}

export interface Therapist 
{
    activated: boolean;
    min: number;
    max: number;
}

export interface Prapor 
{
    activated: boolean;
    min: number;
    max: number;
}

export interface InsuranceTime 
{
    activated: boolean;
    therapist: Therapist;
    prapor: Prapor;
}

export interface TraderChanges 
{
    allTraders4Stars: boolean;
    unlockAllItemsAtLL1: boolean;
    removeItemsFromQuestLocks: boolean;
}

export interface Traders 
{
    allQuestsAvailable: boolean;
    allClothesFree: boolean;
    allClothesForEverySide: boolean;
    changeFleaMarketLvl: boolean | number;
    insuranceTime: InsuranceTime;
    traderChanges: TraderChanges;
    maxInsuranceStorageTime: boolean | number;
    preventFenceMastering: boolean;
    removeFIRConditionOnQuests: boolean;
}

export interface Raids 
{
    noExtractRestrictions: boolean;
    allExtractionsAvailable: boolean;
    increasedBossChance: boolean;
    extendedRaid: boolean | number;
    removeLabsKeycard: boolean;
    extractionsExtended: boolean;
    insuranceOnAllMaps: boolean;
}

export interface Fixes 
{
    finsChokeMeHarder: boolean;
    chompsRaiderSpawnFix: boolean;
    justNUsEvenMoreOpenZones: boolean;
}

export interface CompatibilityMods 
{
    terragroupSpecialist: boolean;
    coDMWMilSimCTSFOI: boolean;
    additionnalGearTan: boolean;
    additionnalGearBlack: boolean;
    additionnalGearUntar: boolean;
    additionnalClothing: boolean;
    andrudisQuestManiac: boolean;
}

export interface PreWipeEvents 
{
    raidersOnAllMaps: boolean;
    killaOnFactory: boolean;
    allBossesOnReserve: boolean;
    allTradersSellCheapItems: boolean;
    makeObdolbosPowerful: boolean;
    gluhkarOnLabs: boolean;
}

export interface InGameEvents 
{
    heatWave: boolean;
}

export interface Other 
{
    compatibilityMods: CompatibilityMods;
    preWipeEvents: PreWipeEvents;
    inGameEvents: InGameEvents;
    hideWarningMessage: boolean;
    showModLogs: boolean;
}

export interface IConfig 
{
    items: Items;
    hideout: Hideout;
    player: Player;
    traders: Traders;
    raids: Raids;
    fixes: Fixes;
    other: Other;
}

