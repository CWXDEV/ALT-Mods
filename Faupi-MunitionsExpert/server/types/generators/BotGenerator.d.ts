import { BotDifficultyHelper } from "../helpers/BotDifficultyHelper";
import { BotHelper } from "../helpers/BotHelper";
import { GameEventHelper } from "../helpers/GameEventHelper";
import { ProfileHelper } from "../helpers/ProfileHelper";
import { WeightedRandomHelper } from "../helpers/WeightedRandomHelper";
import { Health as PmcHealth, IBotBase, Skills } from "../models/eft/common/tables/IBotBase";
import { Health, IBotType, Inventory } from "../models/eft/common/tables/IBotType";
import { BotGenerationDetails } from "../models/spt/bots/BotGenerationDetails";
import { IBotConfig } from "../models/spt/config/IBotConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { BotEquipmentFilterService } from "../services/BotEquipmentFilterService";
import { HashUtil } from "../utils/HashUtil";
import { JsonUtil } from "../utils/JsonUtil";
import { RandomUtil } from "../utils/RandomUtil";
import { BotInventoryGenerator } from "./BotInventoryGenerator";
import { BotLevelGenerator } from "./BotLevelGenerator";
export declare class BotGenerator {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected randomUtil: RandomUtil;
    protected jsonUtil: JsonUtil;
    protected profileHelper: ProfileHelper;
    protected databaseServer: DatabaseServer;
    protected botInventoryGenerator: BotInventoryGenerator;
    protected botLevelGenerator: BotLevelGenerator;
    protected botEquipmentFilterService: BotEquipmentFilterService;
    protected weightedRandomHelper: WeightedRandomHelper;
    protected botHelper: BotHelper;
    protected botDifficultyHelper: BotDifficultyHelper;
    protected gameEventHelper: GameEventHelper;
    protected configServer: ConfigServer;
    protected botConfig: IBotConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, randomUtil: RandomUtil, jsonUtil: JsonUtil, profileHelper: ProfileHelper, databaseServer: DatabaseServer, botInventoryGenerator: BotInventoryGenerator, botLevelGenerator: BotLevelGenerator, botEquipmentFilterService: BotEquipmentFilterService, weightedRandomHelper: WeightedRandomHelper, botHelper: BotHelper, botDifficultyHelper: BotDifficultyHelper, gameEventHelper: GameEventHelper, configServer: ConfigServer);
    /**
     * Generate a player scav bot object
     * @param role e.g. assault / pmcbot
     * @param difficulty easy/normal/hard/impossible
     * @param botTemplate base bot template to use  (e.g. assault/pmcbot)
     * @returns
     */
    generatePlayerScav(sessionId: string, role: string, difficulty: string, botTemplate: IBotType): IBotBase;
    /**
     * Generate an array of bot objects based on a condition for a raid with
     * @param sessionId session id
     * @param botGenerationDetails details on how to generate the bots
     * @returns Generated bots in array
     */
    generateByCondition(sessionId: string, botGenerationDetails: BotGenerationDetails): IBotBase[];
    /**
     * Get the PMCs wildSpawnType value
     * @param role "usec" / "bear"
     * @returns wildSpawnType value as string
     */
    protected getPmcRoleByDescription(role: string): string;
    /**
     * Get a randomised PMC side based on bot config value 'isUsec'
     * @returns pmc side as string
     */
    protected getRandomisedPmcSide(): string;
    /**
     * Get a clone of the database\bots\base.json file
     * @returns IBotBase object
     */
    protected getCloneOfBotBase(): IBotBase;
    /**
     * Create a IBotBase object with equipment/loot/exp etc
     * @param sessionId Session id
     * @param bot bots base file
     * @param botJsonTemplate Bot template from db/bots/x.json
     * @param botGenerationDetails details on how to generate the bot
     * @returns IBotBase object
     */
    protected generateBot(sessionId: string, bot: IBotBase, botJsonTemplate: IBotType, botGenerationDetails: BotGenerationDetails): IBotBase;
    /**
     * Create a bot nickname
     * @param botJsonTemplate x.json from database
     * @param isPlayerScav Will bot be player scav
     * @param botRole role of bot e.g. assault
     * @returns Nickname for bot
     */
    protected generateBotNickname(botJsonTemplate: IBotType, isPlayerScav: boolean, botRole: string): string;
    /**
     * Log the number of PMCs generated to the debug console
     * @param output Generated bot array, ready to send to client
     */
    protected logPmcGeneratedCount(output: IBotBase[]): void;
    /**
     * Converts health object to the required format
     * @param healthObj health object from bot json
     * @param playerScav Is a pscav bot being generated
     * @returns PmcHealth object
     */
    protected generateHealth(healthObj: Health, playerScav?: boolean): PmcHealth;
    protected generateSkills(skillsObj: Skills): Skills;
    /**
     * Iterate through bots inventory and loot to find and remove christmas items (as defined in GameEventHelper)
     * @param nodeInventory Bots inventory to iterate over
     */
    protected removeChristmasItemsFromBotInventory(nodeInventory: Inventory): void;
    /**
     * Generate a random Id for a bot and apply to bots _id and aid value
     * @param bot bot to update
     * @returns updated IBotBase object
     */
    protected generateId(bot: IBotBase): IBotBase;
    protected generateInventoryID(profile: IBotBase): IBotBase;
    /**
     * Get the difficulty passed in, if its not "asoline", get selected difficulty from config
     * @param requestedDifficulty
     * @returns
     */
    protected getPMCDifficulty(requestedDifficulty: string): string;
    /**
     * Add a side-specific (usec/bear) dogtag item to a bots inventory
     * @param bot bot to add dogtag to
     * @returns Bot with dogtag added
     */
    protected generateDogtag(bot: IBotBase): IBotBase;
}
