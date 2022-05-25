import type { DependencyContainer } from "tsyringe";
import { IMod } from "../types/models/external/mod";
import { ILogger } from "../types/models/spt/utils/ILogger";
import { DynamicRouterModService } from "../types/services/mod/dynamicRouter/DynamicRouterModService"
import { DatabaseServer } from "../types/servers/DatabaseServer"
import { JsonUtil } from "../types/utils/JsonUtil"
import { InitialModLoader } from "../types/loaders/InitialModLoader"
const path = require('path');


class HideoutArchitect implements IMod
{
    private logger: ILogger;
    private database: DatabaseServer;
    private router: DynamicRouterModService;
    private json: JsonUtil;
    private globalLocale;
    private modLoader: InitialModLoader;
    private mod;
    private translations;
    private table;

    public load(container: DependencyContainer)
    {
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.router = container.resolve<DynamicRouterModService>("DynamicRouterModService");

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
        this.loadLocalization();
    }
    
    private loadLocalization()
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
            "HideoutArchitect",
            [
                {
                    url: "/HideoutArchitect/GetInfo",
                    action: (url, info, sessionId, output) =>
                    {
                        return this.getModInfo(url, info, sessionId, output)
                    }
                }
            ],
            "HideoutArchitect"
        )
    }

    private getModInfo(url, info, sessionId, output)
    {
        var modOutput = {
            status: 1,
            data: null
        };

        modOutput.data = {...this.mod, ...{path: path.resolve(this.modLoader.getModPath(this.mod.name))}};
        modOutput.status = 0;
        
        return this.json.serialize(modOutput);
    }
}

module.exports = { mod: new HideoutArchitect() };