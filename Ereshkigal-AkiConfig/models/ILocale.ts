export interface HTTP
{
    ip: string;
    port: string;
}

export interface HealthMultipliers
{
    death: string;
    blacked: string;
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
    minAmount: string;
}

export interface MinMax
{
    min: string;
    max: string;
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
    rewardParentBlacklist: string;
    rewardItemBlacklist: string;
    ammoRewards: AmmoRewards;
    moneyRewards: MoneyRewards;
}

export interface Hideout
{
    runIntervalSeconds: string;
    scavCase: ScavCase;
}

export interface LootMultiplier
{
    bigmap: string;
    develop: string;
    factory4day: string;
    factory4night: string;
    interchange: string;
    laboratory: string;
    rezervbase: string;
    shoreline: string;
    woods: string;
    hideout: string;
    lighthouse: string;
    privatearea: string;
    suburbs: string;
    tarkovstreets: string;
    terminal: string;
    town: string;
}

export interface LootValues
{
    allowLootOverlay: boolean;
    looseLootMultiplier: LootMultiplier;
    staticLootMultiplier: LootMultiplier;
    limits: LootMultiplier;
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
    updateTime: string;
    updateTimeDefault: string;
    fenceAssortSize: string;
    fenceMaxPresetsCount: string;
    fencePresetPriceMult: string;
    minDurabilityForSale: string;
    fenceItemIgnoreList: string;
}

export interface Repair
{
    priceMultiplier: string;
}

export interface Insurances
{
    insuranceMultiplier: string;
    returnChancePercent: string;
    runIntervalSeconds: string;
}

export interface Trading
{
    newItemsMarkedFound: boolean;
}

export interface Chance
{
    base: string;
    overprices: string;
    underpriced: string;
}

export interface Time
{
    base: string;
    min: string;
    max: string;
}

export interface Reputation
{
    gain: string;
    loss: string;
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
    conditionChance: string;
    min: string;
    max: string;
}

export interface Blacklist
{
    custom: string;
    enableBsgList: boolean;
    enableQuestList: boolean;
}

export interface Dynamic
{
    expiredOfferThreshold: string;
    offerItemCount: MinMax;
    price: MinMax;
    endTimeSeconds: MinMax;
    condition: Condition;
    stackablePercent: MinMax;
    nonStackableCount: MinMax;
    rating: MinMax;
    currencies: string;
    showAsSingleStack: string;
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

export interface ServerValues 
{
    http: HTTP;
    health: Health;
    hideout: Hideout;
    enableChristmasGifts: boolean;
}

export interface RaidsValues 
{
    lootValues: LootValues;
    airdropValues: string;
    miaOnRaidEnd: boolean;
    raidMenuSettings: RaidMenuSettings;
    save: RaidsValuesSave;
    carExtracts: string;
    carExtractBaseStandingGain: string;
    scavExtractGain: string;
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
    runIntervalSeconds: string;
    sell: Sell;
    traders: FleaMarketTraders;
    dynamic: Dynamic;
}

export interface WeatherValues
{
    acceleration: string;
    weather: Weather;
}

export interface ILocale 
{
    serverValues: ServerValues;
    raidsValues: RaidsValues;
    tradersValues: TradersValues;
    fleaMarketConfiguration: FleaMarketConfiguration;
    weatherValues: WeatherValues;
}