import { IPmcData, Quest } from "../models/eft/common/IPmcData";
import { AvailableForConditions, AvailableForProps, IQuest, Reward } from "../models/eft/common/tables/IQuest";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { IAcceptQuestRequestData } from "../models/eft/quests/IAcceptQuestRequestData";
import { ICompleteQuestRequestData } from "../models/eft/quests/ICompleteQuestRequestData";
import { IQuestConfig } from "../models/spt/config/IQuestConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ItemEventRouter } from "../routers/ItemEventRouter";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { HashUtil } from "../utils/HashUtil";
import { JsonUtil } from "../utils/JsonUtil";
import { TimeUtil } from "../utils/TimeUtil";
import { DialogueHelper } from "./DialogueHelper";
import { ItemHelper } from "./ItemHelper";
import { PaymentHelper } from "./PaymentHelper";
import { ProfileHelper } from "./ProfileHelper";
import { RagfairServerHelper } from "./RagfairServerHelper";
import { TraderHelper } from "./TraderHelper";
export declare class QuestHelper {
    protected logger: ILogger;
    protected jsonUtil: JsonUtil;
    protected timeUtil: TimeUtil;
    protected hashUtil: HashUtil;
    protected itemHelper: ItemHelper;
    protected itemEventRouter: ItemEventRouter;
    protected databaseServer: DatabaseServer;
    protected ragfairServerHelper: RagfairServerHelper;
    protected dialogueHelper: DialogueHelper;
    protected profileHelper: ProfileHelper;
    protected paymentHelper: PaymentHelper;
    protected traderHelper: TraderHelper;
    protected configServer: ConfigServer;
    protected questConfig: IQuestConfig;
    constructor(logger: ILogger, jsonUtil: JsonUtil, timeUtil: TimeUtil, hashUtil: HashUtil, itemHelper: ItemHelper, itemEventRouter: ItemEventRouter, databaseServer: DatabaseServer, ragfairServerHelper: RagfairServerHelper, dialogueHelper: DialogueHelper, profileHelper: ProfileHelper, paymentHelper: PaymentHelper, traderHelper: TraderHelper, configServer: ConfigServer);
    static get STATUS(): Record<string, number>;
    questStatus(pmcData: IPmcData, questID: string): string;
    /**
     * returns true is the condition is satisfied
     */
    evaluateLevel(pmcProfile: IPmcData, cond: AvailableForConditions): boolean;
    getDeltaQuests(before: IQuest[], after: IQuest[]): IQuest[];
    rewardSkillPoints(sessionID: string, pmcData: IPmcData, output: IItemEventRouterResponse, skillName: string, progress: number): void;
    getQuestLocale(questId: string): any;
    /**
     * Debug Routine for showing some information on the
     * quest list in question.
     */
    dumpQuests(quests: any, label?: any): void;
    loyaltyRequirementCheck(loyaltyRequirementProperties: AvailableForProps, profile: IPmcData): boolean;
    protected processReward(reward: Reward): any[];
    getQuestRewardItems(quest: IQuest, state: string): Reward[];
    addQuestToPMCData(pmcData: IPmcData, quest: Quest, newState: string, acceptedQuest: IAcceptQuestRequestData): void;
    acceptedUnlocked(acceptedQuestId: string, sessionID: string): IQuest[];
    failedUnlocked(failedQuestId: string, sessionID: string): IQuest[];
    applyMoneyBoost(quest: IQuest, moneyBoost: number): IQuest;
    changeItemStack(pmcData: IPmcData, id: string, value: number, sessionID: string, output: any): void;
    /**
     * Get List of All Quests as an array
     */
    questValues(): IQuest[];
    protected cleanQuestList(quests: IQuest[]): IQuest[];
    cleanQuestConditions(quest: IQuest): IQuest;
    failQuest(pmcData: IPmcData, body: any, sessionID: string): any;
    getQuestFromDb(questId: string, pmcData: IPmcData): IQuest;
    getQuestLocaleIdFromDb(messageId: string, localisation?: string): string;
    applyQuestReward(pmcData: IPmcData, body: ICompleteQuestRequestData, state: string, sessionID: string): any[];
    getFindItemIdForQuestItem(itemTpl: string): string;
}
