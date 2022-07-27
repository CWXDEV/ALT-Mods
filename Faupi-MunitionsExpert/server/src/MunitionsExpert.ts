import type { DependencyContainer } from "tsyringe";
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { IPostAkiLoadMod } from "@spt-aki/models/external/IPostAkiLoadMod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DynamicRouterModService } from "@spt-aki/services/mod/dynamicRouter/DynamicRouterModService"
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer"
import { JsonUtil } from "@spt-aki/utils/JsonUtil"
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";

class MunitionsExpert implements IPreAkiLoadMod, IPostAkiLoadMod
{
    private logger: ILogger;
    private database: DatabaseServer;
    private router: DynamicRouterModService;
    private json: JsonUtil;
    private modLoader: PreAkiModLoader;
    private table: IDatabaseTables;
    private globalLocale: { [x: string]: { interface: { [x: string]: any; }; }; };
    private mod: { name: string; version: any; author: any;};
    private translations: { [x: string]: any; };
    private items: { [x: string]: any; };
    private path: { resolve: (arg0: string) => any; };
    private cfg: { BulletBackgroundColours: boolean; };

    public preAkiLoad(container: DependencyContainer)
    {
        this.router = container.resolve<DynamicRouterModService>("DynamicRouterModService");
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.json = container.resolve<JsonUtil>("JsonUtil");
        this.mod = require("../package.json");
        this.translations = require("../res/translations.json");
        this.logger.info(`Loading: ${this.mod.author}: ${this.mod.name} ${this.mod.version}`);
        this.path = require("path");
        this.cfg = require("./config.json");
        this.hookRoutes();
    }

    public postAkiLoad(container: DependencyContainer)
    {
        this.modLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
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
                        return this.json.serialize(this.path.resolve(this.modLoader.getModPath("Faupi-MunitionsExpert 1.6.0")));
                    }
                }
            ],
            "MunitionsExpert"
        )
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

