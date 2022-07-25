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

class SeeItemValue implements IPreAkiLoadMod, IPostAkiLoadMod
{
    
    private pkg;
    private logger: ILogger;
    private database: DatabaseServer;
    private router: DynamicRouterModService;
    private http: HttpResponseUtil;
    private items: Record<string, ITemplateItem>;
    private table: IDatabaseTables;
    private livePrice;
    private handbookTable: IHandbookBase;
    private therapist;
    private ragman;
    private jaeger;
    private mechanic;
    private prapor;
    private peacekeeper;
    private skier; 
    private fence;
    private tradersArr;
    private cfg;

    public preAkiLoad(container: DependencyContainer): void {
        this.pkg = require("../package.json");
        this.router = container.resolve<DynamicRouterModService>("DynamicRouterModService");
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.http = container.resolve<HttpResponseUtil>("HttpResponseUtil");
        this.logger.info(`loading: ${this.pkg.author}: ${this.pkg.name} ${this.pkg.version}`);
        this.cfg = require("./config.json");
        this.addRoute()
    }
    public postAkiLoad(container: DependencyContainer): void {
        this.database = container.resolve<DatabaseServer>("DatabaseServer");
        this.table = this.database.getTables();
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
        let sPrice = 1;
        let sMutli = 1;
        let parentId = "";
        let origiMax = 1;

        if (id === "5449016a4bdc2d6f028b456f")
        {
            const result = {
                multiplier: 1,
                price: 1,
                originalMax: 1
            };
            this.debugMode("Item was Roubles - returning 1 as price", "yellow");
            return result;
        }

        if (this.cfg.TraderPrice === false)
        {
            const result = {
                multiplier: 1,
                price: this.livePrice[id],
                originalMax: 1
            };
            if (typeof result != "undefined")
            {
                this.debugMode("Config setting false for traders - returning livePrice AVG", "yellow");
                return result 
            }
        }

        for (const i in this.handbookTable.Items)
        {
            if (this.handbookTable.Items[i].Id === id)
            {
                parentId = this.handbookTable.Items[i].ParentId;
                this.debugMode(`ID was found in handbook - parentID = ${parentId}`, "yellow");
                sMutli = this.getBestTraderMulti(parentId);
                this.debugMode(`Multi returned from getBestTraderMulti method was = ${sMutli}`, "yellow");
                sPrice = this.handbookTable.Items[i].Price;
                this.debugMode(`Price taken from handbook.items =  ${sPrice}`, "yellow");
                origiMax = this.getOrigiDura(id);
                this.debugMode(`Original max is: ${origiMax}`, "yellow");
                const result = {
                    multiplier: sMutli,
                    price: sPrice,
                    originalMax: origiMax
                }
                this.debugMode(`Object built to return to client =  ${result.multiplier} and ${result.price}`, "yellow");
                return result;
            } 
        }
        this.debugMode(`No item found in handbook, returning default ${sPrice}`, "yellow");
        return sPrice;
    }

    private getBestTraderMulti(parentId: string): number
    {
        let traderSellCat = "";
        let altTraderSellCat = "";
        let altAltTraderSellCat = "";
        
        for (const i in this.handbookTable.Categories)
        {
            if (this.handbookTable.Categories[i].Id === parentId)
            {
                this.debugMode("Found category from item parent ID", "yellow");
                traderSellCat = this.handbookTable.Categories[i].Id;
                this.debugMode(`Storing trader sell category = ${traderSellCat}`, "yellow");
                altTraderSellCat = this.handbookTable.Categories[i].ParentId;
                this.debugMode(`Storing trader Alt sell category = ${altTraderSellCat}`, "yellow");

                for (const a in this.handbookTable.Categories)
                {
                    if (this.handbookTable.Categories[a].Id === altTraderSellCat)
                    {
                        altAltTraderSellCat = this.handbookTable.Categories[a].ParentId;
                        this.debugMode(`Alt sell category has parent, storing that = ${altAltTraderSellCat}`, "yellow");
                        break;
                    }
                }
                break;
            }
        }

        for (let iter = 0; iter < this.tradersArr.length; iter++)
        {
            if (this.tradersArr[iter].sell_category.includes(traderSellCat))
            {
                this.debugMode(`base sell category found for trader number ${iter} - category is = ${traderSellCat}`, "yellow");
                return this.getBestTraderInfo(iter);
            }

            if (this.tradersArr[iter].sell_category.includes(altTraderSellCat))
            {
                this.debugMode(`alt sell category found for trader number ${iter} - category is = ${altTraderSellCat}`, "yellow");
                return this.getBestTraderInfo(iter);

            }

            if (this.tradersArr[iter].sell_category.includes(altAltTraderSellCat))
            {
                this.debugMode(`alt alt sell category found for trader number ${iter} - category is = ${altAltTraderSellCat}`, "yellow");
                return this.getBestTraderInfo(iter);
            }
        }
        return 1;
    }

    private getBestTraderInfo(trader: number): number
    {
        let traderMulti = 0.54;
        let traderName = "";

        traderMulti = (100 - this.tradersArr[trader].loyaltyLevels[0].buy_price_coef) / 100;
        this.debugMode(`Trader mutli for above is = ${traderMulti}`, "yellow");
        traderName = this.tradersArr[trader].nickname;
        this.debugMode(`Trader name is =  ${traderName}`, "yellow");

        return traderMulti;
    }

    private debugMode(text: string, color: string): void
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