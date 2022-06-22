import { HandbookHelper } from "../helpers/HandbookHelper";
import { ItemHelper } from "../helpers/ItemHelper";
import { PresetHelper } from "../helpers/PresetHelper";
import { Item } from "../models/eft/common/tables/IItem";
import { IBarterScheme } from "../models/eft/common/tables/ITrader";
import { IRagfairConfig } from "../models/spt/config/IRagfairConfig";
import { IRagfairServerPrices } from "../models/spt/ragfair/IRagfairServerPrices";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { RandomUtil } from "../utils/RandomUtil";
export declare class RagfairPriceService {
    protected handbookHelper: HandbookHelper;
    protected databaseServer: DatabaseServer;
    protected logger: ILogger;
    protected itemHelper: ItemHelper;
    protected presetHelper: PresetHelper;
    protected randomUtil: RandomUtil;
    protected configServer: ConfigServer;
    protected ragfairConfig: IRagfairConfig;
    protected prices: IRagfairServerPrices;
    constructor(handbookHelper: HandbookHelper, databaseServer: DatabaseServer, logger: ILogger, itemHelper: ItemHelper, presetHelper: PresetHelper, randomUtil: RandomUtil, configServer: ConfigServer);
    generateStaticPrices(): void;
    generateDynamicPrices(): void;
    hasDynamicPrices(): boolean;
    getDynamicPrice(itemTpl: string): number;
    getAllFleaPrices(): Record<string, number>;
    getFleaPriceForItem(tplId: string): number;
    getBarterPrice(barterScheme: IBarterScheme[]): number;
    getDynamicOfferPrice(items: Item[], desiredCurrency: string): number;
    getWeaponPresetPrice(item: Item, items: Item[], existingPrice: number): number;
}