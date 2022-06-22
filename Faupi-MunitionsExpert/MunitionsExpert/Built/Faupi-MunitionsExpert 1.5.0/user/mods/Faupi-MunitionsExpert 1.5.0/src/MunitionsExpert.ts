import type { DependencyContainer } from "tsyringe";
import { IMod } from "@spt-aki/models/external/mod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DynamicRouterModService } from "@spt-aki/services/mod/dynamicRouter/DynamicRouterModService"
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer"
import { JsonUtil } from "@spt-aki/utils/JsonUtil"
import { InitialModLoader } from "@spt-aki/loaders/InitialModLoader"
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";

class MunitionsExpert implements IMod
{
    private logger: ILogger;
    private database: DatabaseServer;
    private router: DynamicRouterModService;
    private json: JsonUtil;
    private modLoader: InitialModLoader;
    private table: IDatabaseTables;
    private globalLocale: { [x: string]: { interface: { [x: string]: any; }; }; };
    private mod: { name: string; version: any; author: any;};
    private translations: { [x: string]: any; };
    private items: { [x: string]: any; };
    private path: { resolve: (arg0: string) => any; };
    private cfg: { BulletBackgroundColours: boolean; };

    public load(container: DependencyContainer)
    {
        this.router = container.resolve<DynamicRouterModService>("DynamicRouterModService");
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.json = container.resolve<JsonUtil>("JsonUtil");
        this.mod = require("../package.json");
        this.translations = require("../res/translations.json");
        this.logger.info(`Loading: ${this.mod.author}: ${this.mod.name} - ${this.mod.version}`);
        this.path = require("path");
        this.cfg = require("./config.json");
        this.hookRoutes();
    }

    public delayedLoad(container: DependencyContainer)
    {
        this.modLoader = container.resolve<InitialModLoader>("InitialModLoader");
        this.database = container.resolve<DatabaseServer>("DatabaseServer");
        this.table = this.database.getTables();
        this.globalLocale = this.table.locales.global;
        this.items = this.table.templates.items;
        this.updateLocalization();
        this.changeBulletColour();
    }

    private updateLocalization()
    {
        for (const language in this.translations)
        {
            if (!(language in this.globalLocale))
            {
                continue;
            } 

            const attrKvPair = this.translations[language];
            for (const attrKey in attrKvPair)
            {
                const attrValue = attrKvPair[attrKey];

                this.globalLocale[language].interface[attrKey] = attrValue;
            }
        }
    }

    private hookRoutes()
    {
        this.router.registerDynamicRouter(
            "MunitionsExpert",
            [
                {
                    url: "/MunitionsExpert/GetInfo",
                    action: (url, info, sessionId, output) =>
                    {
                        return this.getModInfo(url, info, sessionId, output)
                    }
                }
            ],
            "MunitionsExpert"
        )
    }

    getModInfo(url: string, info: any, sessionID: string, output: string)
    {
        const modOutput = {
            status: 1,
            data: {}
        };

        modOutput.data = {...this.mod, ...{path: this.path.resolve(this.modLoader.getModPath(this.mod.name))}};
        modOutput.status = 0;
        
        return this.json.serialize(modOutput);
    }

    changeBulletColour()
    {
        if (this.cfg.BulletBackgroundColours === true)
        {
            for (const i in this.items) 
            {
                const item = this.items[i]
            
                //set baground colour of ammo depending on pen
                if (item._parent === "5485a8684bdc2da71d8b4567") 
                {
                    const pen = item._props.PenetrationPower
                    let colour = ""
            
                    pen > 60 ? colour = "red" :     //SuperHighPen 
                    pen > 50 ? colour = "yellow" :  //HighPen 
                    pen > 40 ? colour = "violet" :  //MedHighPen 
                    pen > 30 ? colour = "blue" :    //MedPen 
                    pen > 20 ? colour = "green" :   //LowMedPen 
                    colour = "grey"                 //LowPen 
                    item._props.BackgroundColor = colour
                }
            }
        }
    }
}

module.exports = { mod: new MunitionsExpert() };