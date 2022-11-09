import type { DependencyContainer } from "tsyringe";
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { IPostAkiLoadMod } from "@spt-aki/models/external/IPostAkiLoadMod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DynamicRouterModService } from "@spt-aki/services/mod/dynamicRouter/DynamicRouterModService"
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer"
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil"
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { IHandbookBase } from "@spt-aki/models/eft/common/tables/IHandbookBase";
import { ITraderBase } from "@spt-aki/models/eft/common/tables/ITrader";

class SeeItemValue implements IPreAkiLoadMod, IPostAkiLoadMod
{
    private logger: ILogger;
    private router: DynamicRouterModService;
    private http: HttpResponseUtil;
    private items: Record<string, ITemplateItem>;
    private table: IDatabaseTables;
    private livePrice;
    private handbookTable: IHandbookBase;
    private therapist: ITraderBase;
    private ragman: ITraderBase;
    private jaeger: ITraderBase;
    private mechanic: ITraderBase;
    private prapor: ITraderBase;
    private peacekeeper: ITraderBase;
    private skier: ITraderBase; 
    private fence: ITraderBase;
    private tradersArr: ITraderBase[];
    private cfg: { TraderPrice: any; DebugMode: any; };

    public preAkiLoad(container: DependencyContainer): void 
    {
        this.router = container.resolve<DynamicRouterModService>("DynamicRouterModService");
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.http = container.resolve<HttpResponseUtil>("HttpResponseUtil");
        this.cfg = require("./config.json");
        this.addRoute()
    }
    
    public postAkiLoad(container: DependencyContainer): void 
    {
        this.table = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        this.items = this.table.templates.items;
        this.livePrice = this.table.templates.prices;
        this.handbookTable = this.table.templates.handbook;
        this.therapist = this.table.traders["54cb57776803fa99248b456e"].base;
        this.ragman = this.table.traders["5ac3b934156ae10c4430e83c"].base;
        this.jaeger = this.table.traders["5c0647fdd443bc2504c2d371"].base;
        this.mechanic = this.table.traders["5a7c2eca46aef81a7ca2145d"].base;
        this.prapor = this.table.traders["54cb50c76803fa8b248b4571"].base;
        this.peacekeeper = this.table.traders["5935c25fb3acc3127c3d8cd9"].base;
        this.skier = this.table.traders["58330581ace78e27b8b10cee"].base;
        this.fence = this.table.traders["579dc571d53a0658a154fbec"].base;
        this.tradersArr = [this.therapist, this.ragman, this.jaeger, this.mechanic, this.prapor, this.skier, this.peacekeeper, this.fence];
        
    }

    private addRoute() : void
    {
        this.router.registerDynamicRouter(
            "seeitemvalue",
            [
                {
                    url: "/cwx/seeitemvalue/",
                    action: (url, info, sessionId, output) =>
                    {
                        return this.onRequestConfig(url, info, sessionId, output)
                    }
                }
            ],
            "seeitemvalue"
        )
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private onRequestConfig(url: string, _info: any, _sessionId: string, _output: string): any
    {
        const splittedUrl = url.split("/");
        const id = splittedUrl[splittedUrl.length - 1].toLowerCase();
        return this.http.noBody(this.getIdPrice(id));
    }

    private getIdPrice(id: string): any
    {
        const result = {
            multiplier: 1,
            price: 1,
            originalMax: 1,
            traderName: "Default"
        };

        // if ID is roubles - return 1
        if (id === "5449016a4bdc2d6f028b456f")
        {
            this.debugMode("Item was Roubles - returning 1 as price");
            return result;
        }

        // if config is set to false (live price)
        if (!this.cfg.TraderPrice)
        {
            result.traderName = "Flea";

            result.originalMax = this.getOrigiDura(id);
            this.debugMode(`Original max is ${result.originalMax}`);

            // return price if it exists else return 1
            if (this.livePrice[id])
            {
                result.price = this.livePrice[id];

                this.debugMode("Config setting false for traders - returning livePrice AVG found");
                return result;
            }
            else
            {
                this.debugMode("Config setting false for traders - unable to find livePrice - returning 1");
                return result;
            }
        }

        // if config is set to true (trader prices)
        if (this.cfg.TraderPrice)
        {
            // search through all items in handbook
            const item = this.handbookTable.Items.find(x => x.Id === id);

            // if ID is found in handbook else returns default result object
            if (item)
            {
                // gets price of item from handbook else return 1
                if (item.Price)
                {
                    result.price = item.Price;
                    this.debugMode(`Price found in handbook - ${result.price}`);
                }
                else
                {
                    result.price = 1;
                    this.debugMode(`unable to find price in handbook for ID - ${id}`);
                }

                // gets parent of ID from handbook and trader multiplier else returns "" and 1
                if (item.ParentId)
                {
                    this.debugMode(`ParentID found in handbook - ${item.ParentId}`);

                    const { k1, k2 } = this.getBestTraderMulti(item.ParentId);

                    result.multiplier = k1;
                    result.traderName = k2;

                    this.debugMode(`Best multiplier is ${result.multiplier}`);
                    this.debugMode(`Best Trader name is ${result.traderName}`);
                }
                else
                {
                    result.multiplier = 1;
                    this.debugMode(`Unable to find ParentID in handbook for ID - ${id}`);
                    this.debugMode("Returning 1 for multiplier");
                }

                // gets original max durability of resource type for item
                result.originalMax = this.getOrigiDura(id);
                this.debugMode(`Original max is ${result.originalMax}`);

                return result;
            }
            else
            {
                this.debugMode("No item found in handbook, returning default result");
                return result;
            }
        }
    }

    private getBestTraderMulti(parentId: string): any
    {
        const firstCat = this.handbookTable?.Categories?.find(x => x.Id === parentId);
        const secondCat = firstCat?.ParentId
        const thirdCat = this.handbookTable?.Categories?.find(x => x.Id === secondCat)?.ParentId;

        const result = {k1: 1, k2: "Unknown"};

        if (firstCat.Id || secondCat || thirdCat)
        {
            for (const i in this.tradersArr)
            {
                if (this.tradersArr[i]?.sell_category?.includes(firstCat.Id) || 
                    this.tradersArr[i]?.sell_category?.includes(secondCat) || 
                    this.tradersArr[i]?.sell_category?.includes(thirdCat))
                {
                    const multi = (100 - this.tradersArr[i]?.loyaltyLevels[0]?.buy_price_coef) / 100;
                    const name = this.tradersArr[i]?.nickname;

                    result.k1 = multi;
                    result.k2 = name;

                    return result;
                }
            }

            return result;
        }
        else
        {
            return result;
        }
    }

    private debugMode(text: string, color = "yellow"): void
    {
        if (this.cfg.DebugMode)
        {
            this.logger.log(text, color);
        }
    }

    private getOrigiDura(item: string): number
    {
        if (this.items[item]?._props?.MaxHpResource)
        {
            return this.items[item]._props.MaxHpResource;
        }

        if (this.items[item]?._props?.MaxDurability)
        {
            return this.items[item]._props.MaxDurability;
        }

        if (this.items[item]?._props?.MaxResource)
        {
            return this.items[item]._props.MaxResource;
        }

        if (this.items[item]?._props?.Durability)
        {
            return this.items[item]._props.Durability;
        }

        if (this.items[item]?._props?.MaxRepairResource)
        {
            return this.items[item]._props.MaxRepairResource;
        }

        return 1;
    }
}

module.exports = { mod: new SeeItemValue() }