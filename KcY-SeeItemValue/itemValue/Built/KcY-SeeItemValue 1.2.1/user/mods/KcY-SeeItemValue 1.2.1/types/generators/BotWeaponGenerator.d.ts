import { BotGeneratorHelper } from "../helpers/BotGeneratorHelper";
import { ItemHelper } from "../helpers/ItemHelper";
import { WeightedRandomHelper } from "../helpers/WeightedRandomHelper";
import { Inventory as PmcInventory } from "../models/eft/common/IPmcData";
import { MinMax, Mods, ModsChances } from "../models/eft/common/tables/IBotType";
import { Item } from "../models/eft/common/tables/IItem";
import { ITemplateItem } from "../models/eft/common/tables/ITemplateItem";
import { ILogger } from "../models/spt/utils/ILogger";
import { DatabaseServer } from "../servers/DatabaseServer";
import { HashUtil } from "../utils/HashUtil";
import { RandomUtil } from "../utils/RandomUtil";
export declare class BotWeaponGenerator {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected databaseServer: DatabaseServer;
    protected itemHelper: ItemHelper;
    protected weightedRandomHelper: WeightedRandomHelper;
    protected botGeneratorHelper: BotGeneratorHelper;
    protected randomUtil: RandomUtil;
    constructor(logger: ILogger, hashUtil: HashUtil, databaseServer: DatabaseServer, itemHelper: ItemHelper, weightedRandomHelper: WeightedRandomHelper, botGeneratorHelper: BotGeneratorHelper, randomUtil: RandomUtil);
    generateWeapon(equipmentSlot: string, weaponPool: Record<string, number>, modPool: Mods, modChances: ModsChances, magCounts: MinMax, botRole: string, isPmc: boolean, inventory: PmcInventory): void;
    /** Checks if all required slots are occupied on a weapon and all it's mods */
    protected isWeaponValid(itemList: Item[]): boolean;
    /**
    * Generates extra magazines or bullets (if magazine is internal) and adds them to TacticalVest and Pockets.
    * Additionally, adds extra bullets to SecuredContainer
    *
    * @param {*} weaponMods
    * @param {*} weaponTemplate
    * @param {*} magCounts
    * @param {*} ammoTpl
    * @returns
    */
    protected generateExtraMagazines(weaponMods: Item[], weaponTemplate: ITemplateItem, magCounts: MinMax, ammoTpl: string, inventory: PmcInventory): void;
    protected addBullets(ammoTpl: string, bulletCount: number, inventory: PmcInventory): void;
    /**
     * Finds and returns tpl of ammo that should be used, while making sure it's compatible
     *
     * @param {*} weaponMods
     * @param {*} weaponTemplate
     * @returns
     */
    protected getCompatibleAmmo(weaponMods: Item[], weaponTemplate: ITemplateItem): string;
    /** Fill existing magazines to full, while replacing their contents with specified ammo */
    protected fillExistingMagazines(weaponMods: Item[], magazine: Item, ammoTpl: string): void;
}
