import { PMCLootGenerator } from "../generators/PMCLootGenerator";
import { Items } from "../models/eft/common/tables/IBotType";
import { ITemplateItem } from "../models/eft/common/tables/ITemplateItem";
import { BotLootCache, LootCacheType } from "../models/spt/bots/BotLootCache";
import { ILogger } from "../models/spt/utils/ILogger";
import { DatabaseServer } from "../servers/DatabaseServer";
import { JsonUtil } from "../utils/JsonUtil";
import { RagfairPriceService } from "./RagfairPriceService";
export declare class BotLootCacheService {
    protected logger: ILogger;
    protected jsonUtil: JsonUtil;
    protected databaseServer: DatabaseServer;
    protected pmcLootGenerator: PMCLootGenerator;
    protected ragfairPriceService: RagfairPriceService;
    protected lootCache: Record<string, BotLootCache>;
    constructor(logger: ILogger, jsonUtil: JsonUtil, databaseServer: DatabaseServer, pmcLootGenerator: PMCLootGenerator, ragfairPriceService: RagfairPriceService);
    /**
     * Remove all cached bot loot data
     */
    clearCache(): void;
    /**
     * Get the fully created loot array, ordered by price low to high
     * @param botRole bot to get loot for
     * @param isPmc is the bot a pmc
     * @param lootType what type of loot is needed
     * @param lootPool the full pool of loot (needed when cache is empty)
     * @returns ITemplateItem array
     */
    getLootFromCache(botRole: string, isPmc: boolean, lootType: LootCacheType, lootPool: Items): ITemplateItem[];
    /**
     * Generate loot for a bot and store inside a private class property
     * @param botRole
     * @param lootType
     * @param lootPool the full pool of loot we use to create the various sub-categories with
     * @param isPmc
     */
    protected addLootToCache(botRole: string, isPmc: boolean, lootType: LootCacheType, lootPool: Items): void;
    /**
     * Check if a bot type exists inside the loot cache
     * @param botRole role to check for
     * @returns true if they exist
     */
    protected botRoleExistsInCache(botRole: string): boolean;
    /**
     * If lootcache is null, init with empty property arrays
     * @param botRole Bot role to hydrate
     */
    protected initCacheForBotRole(botRole: string): void;
    /**
     * Compares two item prices by their flea (or handbook if that doesnt exist) price
     * -1 when a < b
     * 0 when a === b
     * 1 when a > b
     * @param itemAPrice
     * @param itemBPrice
     * @returns
     */
    protected compareByValue(itemAPrice: number, itemBPrice: number): number;
}
