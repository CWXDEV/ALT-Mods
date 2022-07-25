export interface PresetBatch
{
    assault: string;
    bossBully: string;
    bossGluhar: string;
    bossKilla: string;
    bossKojaniy: string;
    bossSanitar: string;
    bossTagilla: string;
    bossTest: string;
    cursedAssault: string;
    followerBully: string;
    followerGluharAssault: string;
    followerGluharScout: string;
    followerGluharSecurity: string;
    followerGluharSnipe: string;
    followerKojaniy: string;
    followerSanitar: string;
    followerTagilla: string;
    followerTest: string;
    marksman: string;
    pmcBot: string;
    sectantPriest: string;
    sectantWarrior: string;
    gifter: string;
    test: string;
    exUsec: string;    
}

export interface DefaultArmor
{
    maxDelta: string;
    minDelta: string;
}

export interface PmcArmor
{
    lowestMaxPercent: string;
    highestMaxPercent: string;
    maxDelta: string;
    minDelta: string;
}

export interface Weapon
{
    lowestMax: string;
    highestMax: string;
    maxDelta: string;
    minDelta: string;
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
    scav: string;
    pmc: string;
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
    whitelist: string;
    blacklist: string;
    spawnLimits: string;
    moneyStackLimits: string;
}

export interface Types
{
    assault: string;
    cursedAssault: string;
    pmcBot: string;
    exUsec: string;
}

export interface PMCConfig
{
    dynamicLoot: DynamicLoot;
    cartridgeBlacklist: string;
    difficulty: string;
    isUsec: string;
    chanceSameSideIsHostilePercent: string;
    usecType: string;
    bearType: string;
    maxBackpackLootTotalRub: string;
    maxPocketLootTotalRub: string;
    maxVestLootTotalRub: string;
    types: Types;
}

export interface IPmcLocale
{
    presetBatch: PresetBatch;
    bosses: string;
    durability: Durability;
    lootNValue: LootNValue;
    pmc: PMCConfig;
    showTypeInNickname: boolean;
    maxBotCap: string;
}