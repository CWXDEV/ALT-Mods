import type { DependencyContainer } from "tsyringe";
import { IMod } from "../types/models/external/mod";
import { ILogger } from "../types/models/spt/utils/ILogger";
import { DynamicRouterModService } from "../types/services/mod/dynamicRouter/DynamicRouterModService"
import { DatabaseServer } from "../types/servers/DatabaseServer"
import { HttpResponseUtil } from "../types/utils/HttpResponseUtil"
const cfg = require("./config.json");

class SeeItemValue implements IMod
{
    private name = "KcY-SeeItemValue";
    private version = "1.3.0";
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


    public load(container: DependencyContainer)
    {
        this.router = container.resolve<DynamicRouterModService>("DynamicRouterModService");
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.http = container.resolve<HttpResponseUtil>("HttpResponseUtil");
        this.logger.info(`loading: ${this.name} ${this.version}`);
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
        this.fence = this.table.traders["579dc571d53a0658a154fbec"].base;
        this.tradersArr = [this.therapist, this.ragman, this.jaeger, this.mechanic, this.prapor, this.peacekeeper, this.skier, this.fence];
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

        // if TraderPrice in cfg is False get price from flea AVG
        if(cfg.TraderPrice === false)
        {
            const result = this.livePrice[id];
            if(typeof result != `undefined`)
            {
                return result;
            }
            // will still default to Handbook if no price is found for flea AVG
        }
        // if TraderPrice in cfg is True get price from handbook
        // as traders have a modifier, avg is 0.54, closest we can get without checking against each trader
        // thanks to TEOA for this info
        for(let i in this.handbookTable.Items)
        {
            if(this.handbookTable.Items[i].Id === id)
            {
                parentId = this.handbookTable.Items[i].ParentId;
                sMutli = this.getBestTraderMulti(parentId);
                sPrice = this.handbookTable.Items[i].Price;
                let result = (sPrice*sMutli);

                return result;
            } 
        }
        return sPrice;
    }

    private getBestTraderMulti(parentId)
    {
        let traderSellCat = "";
        let traderMulti = 0.54;
        let traderName = ""; // could be used later to be passed back to module to show trader and price
        let altTraderSellCat = "";
        
        for(let i in this.handbookTable.Categories)
        {
            if(this.handbookTable.Categories[i].Id === parentId)
            {
                traderSellCat = this.handbookTable.Categories[i].Id;
                altTraderSellCat = this.handbookTable.Categories[i].ParentId;
                break;
            }
        }

        for(let iter = 0; iter < 8; iter++)
        {
            if(this.tradersArr[iter].sell_category.includes(traderSellCat))
            {
                traderMulti = (100 - this.tradersArr[iter].loyaltyLevels[0].buy_price_coef) / 100;
                traderName = this.tradersArr[iter].nickname;
                return traderMulti;
            }
        }

        for(let iter = 0; iter < 8; iter++)
        {
            if(this.tradersArr[iter].sell_category.includes(altTraderSellCat))
            {
                traderMulti = (100 - this.tradersArr[iter].loyaltyLevels[0].buy_price_coef) / 100;
                traderName = this.tradersArr[iter].nickname;
                return traderMulti;
            }
        }
        return cfg.TraderMultiplier;
    }
}

module.exports = { mod: new SeeItemValue() }