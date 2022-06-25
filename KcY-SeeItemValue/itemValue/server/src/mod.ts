import type { DependencyContainer } from "tsyringe";
import { IMod } from "@spt-aki/models/external/mod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DynamicRouterModService } from "@spt-aki/services/mod/dynamicRouter/DynamicRouterModService"
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer"
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil"

class SeeItemValue implements IMod
{
    private pkg;
    private logger: ILogger;
    private database: DatabaseServer;
    private router: DynamicRouterModService;
    private http: HttpResponseUtil;
    private table;
    private livePrice;
    private handbookTable;
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

    public load(container: DependencyContainer)
    {
        this.pkg = require("../package.json");
        this.router = container.resolve<DynamicRouterModService>("DynamicRouterModService");
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.http = container.resolve<HttpResponseUtil>("HttpResponseUtil");
        this.logger.info(`loading: ${this.pkg.author}: ${this.pkg.name} ${this.pkg.version}`);
        this.cfg = require("./config.json");
        this.addRoute()
    }

    public delayedLoad(container: DependencyContainer)
    {
        this.database = container.resolve<DatabaseServer>("DatabaseServer");
        this.table = this.database.getTables();
        this.livePrice = this.table.templates.prices;
        this.handbookTable = this.table.templates.handbook;
        this.therapist = this.table.traders["54cb57776803fa99248b456e"].base;
        this.ragman = this.table.traders["5ac3b934156ae10c4430e83c"].base;
        this.jaeger = this.table.traders["5c0647fdd443bc2504c2d371"].base;
        this.mechanic = this.table.traders["5a7c2eca46aef81a7ca2145d"].base;
        this.prapor = this.table.traders["54cb50c76803fa8b248b4571"].base;
        this.peacekeeper = this.table.traders["5935c25fb3acc3127c3d8cd9"].base;
        this.skier = this.table.traders["58330581ace78e27b8b10cee"].base;
        this.tradersArr = [this.therapist, this.ragman, this.jaeger, this.mechanic, this.prapor, this.peacekeeper, this.skier];
    }

    private addRoute()
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

    private onRequestConfig(url, info, sessionId, output)
    {
        const splittedUrl = url.split("/");
        const id = splittedUrl[splittedUrl.length - 1].toLowerCase();
        return this.http.noBody(this.getIdPrice(id));
    }

    private getIdPrice(id)
    {
        let sPrice = 1;
        let sMutli = 1;
        let parentId = "";

        if (id === "5449016a4bdc2d6f028b456f")
        {
            return 1;
        }

        if (this.cfg.TraderPrice === false)
        {
            const result = this.livePrice[id];
            if (typeof result != "undefined")
            {
                return result;
            }
        }

        for (const i in this.handbookTable.Items)
        {
            if (this.handbookTable.Items[i].Id === id)
            {
                parentId = this.handbookTable.Items[i].ParentId;
                sMutli = this.getBestTraderMulti(parentId);
                sPrice = this.handbookTable.Items[i].Price;
                const result = {
                    multiplier: sMutli,
                    price: sPrice
                }
                return result;
            } 
        }
        return sPrice;
    }

    private getBestTraderMulti(parentId)
    {
        let traderSellCat = "";
        let traderMulti = 0.54;
        let traderName = "";
        let altTraderSellCat = "";
        let altAltTraderSellCat = "";
        
        for (const i in this.handbookTable.Categories)
        {
            if (this.handbookTable.Categories[i].Id === parentId)
            {
                traderSellCat = this.handbookTable.Categories[i].Id;
                altTraderSellCat = this.handbookTable.Categories[i].ParentId;

                for (const a in this.handbookTable.Categories)
                {
                    if (this.handbookTable.Categories[a].Id === altTraderSellCat)
                    {
                        altAltTraderSellCat = this.handbookTable.Categories[a].ParentId;
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
                traderMulti = (100 - this.tradersArr[iter].loyaltyLevels[0].buy_price_coef) / 100;
                traderName = this.tradersArr[iter].nickname;
                return traderMulti;
            }
        }

        for (let iter = 0; iter < this.tradersArr.length; iter++)
        {
            if (this.tradersArr[iter].sell_category.includes(altTraderSellCat))
            {
                traderMulti = (100 - this.tradersArr[iter].loyaltyLevels[0].buy_price_coef) / 100;
                traderName = this.tradersArr[iter].nickname;
                return traderMulti;
            }
        }

        for (let iter = 0; iter < this.tradersArr.length; iter++)
        {
            if (this.tradersArr[iter].sell_category.includes(altAltTraderSellCat))
            {
                traderMulti = (100 - this.tradersArr[iter].loyaltyLevels[0].buy_price_coef) / 100;
                traderName = this.tradersArr[iter].nickname;
                return traderMulti;
            }
        }
        return 1;
    }
}

module.exports = { mod: new SeeItemValue() }

/*
[Client Request] /cwx/seeitemvalue/599860ac86f77436b225ed1a
ID from pulgin: 599860ac86f77436b225ed1a
parent id from server mod: 5b5f754a86f774094242f19b
categories ID: 5b5f754a86f774094242f19b
alt categories ID: 5b5f750686f774093e6cb503
alt alt categories ID: 5b5f71a686f77447ed5636ab
Alt Multi for iteration 3: 0.56
Alt trader name for iteration 3: Mechanic
multi from server 0.56
price from server 2422
price after multi 1356.3200000000002
*/