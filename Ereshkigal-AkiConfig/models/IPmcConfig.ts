export interface PresetBatch
{
    assault: number;
    bossBully: number;
    bossGluhar: number;
    bossKilla: number;
    bossKojaniy: number;
    bossSanitar: number;
    bossTagilla: number;
    bossTest: number;
    cursedAssault: number;
    followerBully: number;
    followerGluharAssault: number;
    followerGluharScout: number;
    followerGluharSecurity: number;
    followerGluharSnipe: number;
    followerKojaniy: number;
    followerSanitar: number;
    followerTagilla: number;
    followerTest: number;
    marksman: number;
    pmcBot: number;
    sectantPriest: number;
    sectantWarrior: number;
    gifter: number;
    test: number;
    exUsec: number;    
}

export interface DefaultArmor
{
    maxDelta: number;
    minDelta: number;
}

export interface PmcArmor
{
    lowestMaxPercent: number;
    highestMaxPercent: number;
    maxDelta: number;
    minDelta: number;
}

export interface Weapon
{
    lowestMax: number;
    highestMax: number;
    maxDelta: number;
    minDelta: number;
}

export interface Bot
{
    armor: DefaultArmor;
    weapon: Weapon;
}

export interface PMC
{
    armor: PmcArmor;
    weapon: Weapon;
}

export interface LootNValue
{
    scav: number;
    pmc: number;
}

export interface Durability
{
    default: Bot;
    pmc: PMC;
    boss: Bot;
    follower: Bot;
    assault: Bot;
    cursedassault: Bot;
    marksman: Bot;
    pmcbot: Bot;
    exusec: Bot;
    sectantpriest: Bot;
    sectantwarrior: Bot;
}

export interface DynamicLoot
{
    whitelist: any;
    blacklist: any;
    spawnLimits: any;
    moneyStackLimits: any;
}

export interface Types
{
    assault: number;
    cursedAssault: number;
    pmcBot: number;
    exUsec: number;
}

export interface PMCConfig
{
    dynamicLoot: DynamicLoot;
    cartridgeBlacklist: any;
    difficulty: string;
    isUsec: number;
    chanceSameSideIsHostilePercent: number;
    usecType: string;
    bearType: string;
    maxBackpackLootTotalRub: number;
    maxPocketLootTotalRub: number;
    maxVestLootTotalRub: number;
    types: Types;
}

export interface IPmcConfig
{
    presetBatch: PresetBatch;
    bosses: any;
    durability: Durability;
    lootNValue: LootNValue;
    pmc: PMCConfig;
    showTypeInNickname: boolean;
    maxBotCap: number;
}