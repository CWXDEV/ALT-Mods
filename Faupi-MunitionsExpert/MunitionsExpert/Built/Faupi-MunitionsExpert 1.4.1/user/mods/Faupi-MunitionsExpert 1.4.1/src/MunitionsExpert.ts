import type { DependencyContainer } from "tsyringe";
import { IMod } from "../types/models/external/mod";
import { ILogger } from "../types/models/spt/utils/ILogger";
import { DynamicRouterModService } from "../types/services/mod/dynamicRouter/DynamicRouterModService"
import { DatabaseServer } from "../types/servers/DatabaseServer"
import { JsonUtil } from "../types/utils/JsonUtil"
import { InitialModLoader } from "../types/loaders/InitialModLoader"
const path = require('path');
const cfg = require("./config.json");

class MunitionsExpert implements IMod
{
    private logger: ILogger;
    private database: DatabaseServer;
    private router: DynamicRouterModService;
    private json: JsonUtil;
    private modLoader: InitialModLoader;
    private table;
    private globalLocale;
    private mod;
    private translations;
    private items;

    public load(container: DependencyContainer)
    {
        this.router = container.resolve<DynamicRouterModService>("DynamicRouterModService");
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.json = container.resolve<JsonUtil>("JsonUtil");
        this.mod = require("../package.json");
        this.translations = require("../res/translations.json");
        this.logger.info(`Loading: ${this.mod.name} ${this.mod.version}`);
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
        for(let language in this.translations){
            if(!(language in this.globalLocale)) continue;

            let attrKvPair = this.translations[language];
            for(let attrKey in attrKvPair){
                let attrValue = attrKvPair[attrKey];

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

    getModInfo(url, info, sessionID, output)
    {
        var modOutput = {
            status: 1,
            data: null
        };

        modOutput.data = {...this.mod, ...{path: path.resolve(this.modLoader.getModPath(this.mod.name))}};
        modOutput.status = 0;
        
        return this.json.serialize(modOutput);
    }

    changeBulletColour()
    {
        if(cfg.BulletBackgroundColours === true)
        {
            for (const i in this.items) {
                let item = this.items[i]
            
                //set baground colour of ammo depending on pen
                if (item._parent === "5485a8684bdc2da71d8b4567") {
                    let pen = item._props.PenetrationPower
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