export interface HTTP
{
    ip: string;
    port: number;
}

export interface HealthMultipliers
{
    death: number;
    blacked: number;
}

export interface HealthSave
{
    health: boolean;
    effects: boolean;
}

export interface Health
{
    healthMultipliers: HealthMultipliers;
    save: HealthSave;
}

export interface AmmoRewards
{
    giveMultipleOfTen: boolean;
    minAmount: number;
}

export interface MinMax
{
    min: number;
    max: number;
}

export interface MoneyRewards
{
    enabled: boolean;
    rub: MinMax;
    usd: MinMax;
    eur: MinMax
}

export interface ScavCase
{
    rewardParentBlacklist: any;
    rewardItemBlacklist: any;
    ammoRewards: AmmoRewards;
    moneyRewards: MoneyRewards;
}

export interface Hideout
{
    runIntervalSeconds: number;
    scavCase: ScavCase;
    fuelDrainRateMultipler: number;
}

export interface LootMultiplier
{
    bigmap: number;
    develop: number;
    factory4day: number;
    factory4night: number;
    interchange: number;
    laboratory: number;
    rezervbase: number;
    shoreline: number;
    woods: number;
    hideout: number;
    lighthouse: number;
    privatearea: number;
    suburbs: number;
    tarkovstreets: number;
    terminal: number;
    town: number;
}

export interface LootValues
{
    looseLootMultiplier: LootMultiplier;
    staticLootMultiplier: LootMultiplier;
}

export interface AirdropChancePercent 
{
    bigmap: number;
    woods: number;
    lighthouse: number;
    shoreline: number;
    interchange: number;
    reserve: number;
}

export interface AirdropValues 
{
    airdropChancePercent: AirdropChancePercent;
    airdropMinOpenHeight: number;
    airdropMaxOpenHeight: number;
    planeMinFlyHeight: number;
    planeMaxFlyHeight: number;
    planeVolume: number;
    airdropMinStartTimeSeconds: number;
    airdropMaxStartTimeSeconds: number;
}

export interface RaidMenuSettings
{
    aiAmount: string;
    aiDifficulty: string;
    bossEnabled: boolean;
    scavWars: boolean;
    taggedAndCursed: boolean;
}

export interface RaidsValuesSave
{
    loot: boolean;
    durability: boolean;
}

export interface Traders
{
    updateTime: any;
    updateTimeDefault: number;
    fenceAssortSize: number;
    fenceMaxPresetsCount: number;
    fencePresetPriceMult: number;
    minDurabilityForSale: number;
    fenceItemIgnoreList: any;
}

export interface Repair
{
    priceMultiplier: number;
}

export interface Insurances
{
    insuranceMultiplier: any;
    returnChancePercent: any;
    runIntervalSeconds: number;
}

export interface Trading
{
    newItemsMarkedFound: boolean;
}

export interface Chance
{
    base: number;
    overprices: number;
    underpriced: number;
}

export interface Time
{
    base: number;
    min: number;
    max: number;
}

export interface Reputation
{
    gain: number;
    loss: number;
}

export interface Sell
{
    fees: boolean;
    chance: Chance;
    time: Time;
    reputation: Reputation;
}

export interface FleaMarketTraders
{
    EnablePraporOffers: boolean;
    EnableTheRapistOffers: boolean;
    EnableFenceOffers: false,
    EnableSkierOffers: boolean;
    EnablePeacekeeperOffers: boolean;
    EnableMechanicOffers: boolean;
    EnableRagmanOffers: boolean;
    EnableJaegerOffers: boolean;
    EnableAllAvailableOffers: boolean;
}

export interface Condition
{
    conditionChance: number;
    min: number;
    max: number;
}

export interface Blacklist
{
    custom: any;
    enableBsgList: boolean;
    enableQuestList: boolean;
}

export interface Dynamic
{
    expiredOfferThreshold: number;
    offerItemCount: MinMax;
    price: MinMax;
    endTimeSeconds: MinMax;
    condition: Condition;
    stackablePercent: MinMax;
    nonStackableCount: MinMax;
    rating: MinMax;
    currencies: any;
    showAsSingleStack: any;
    blacklist: Blacklist;
}

export interface Weather
{
    clouds: MinMax;
    windSpeed: MinMax;
    windDirection: MinMax;
    windGustiness: MinMax;
    rain: MinMax;
    rainIntensity: MinMax;
    fog: MinMax;
    temp: MinMax;
    pressure: MinMax;
}

export interface Other 
{
    hideWarningMessage: boolean;
    showModLogs: boolean;
}

export interface ServerValues 
{
    http: HTTP;
    health: Health;
    hideout: Hideout;
}

export interface RaidsValues 
{
    lootValues: LootValues;
    airdropValues: AirdropValues;
    miaOnRaidEnd: boolean;
    raidMenuSettings: RaidMenuSettings;
    save: RaidsValuesSave;
    carExtracts: any;
    carExtractBaseStandingGain: number;
    scavExtractGain: number;
}

export interface TradersValues
{
    traders: Traders;
    repair: Repair;
    insurances: Insurances;
    trading: Trading;
}

export interface FleaMarketConfiguration
{
    runIntervalSeconds: number;
    sell: Sell;
    traders: FleaMarketTraders;
    dynamic: Dynamic;
}

export interface WeatherValues
{
    acceleration: number;
    weather: Weather;
}

export interface IConfig 
{
    serverValues: ServerValues;
    raidsValues: RaidsValues;
    tradersValues: TradersValues;
    fleaMarketConfiguration: FleaMarketConfiguration;
    weatherValues: WeatherValues;
    other: Other;
}