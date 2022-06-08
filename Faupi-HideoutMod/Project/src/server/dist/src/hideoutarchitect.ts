import type { DependencyContainer } from "tsyringe";
import { IMod } from "@spt-aki/models/external/mod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DynamicRouterModService } from "@spt-aki/services/mod/dynamicRouter/DynamicRouterModService"
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer"
import { JsonUtil } from "@spt-aki/utils/JsonUtil"
import { InitialModLoader } from "@spt-aki/loaders/InitialModLoader"

class HideoutArchitect implements IMod
{
    private path;
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
        this.path = require("path");
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

    private getModInfo(url: string, info: any, sessionId: string, output: string)
    {
        const modOutput = {
            status: 1,
            data: null
        };

        modOutput.data = {...this.mod, ...{path: this.path.resolve(this.modLoader.getModPath(this.mod.name))}};
        modOutput.status = 0;
        
        return this.json.serialize(modOutput);
    }
}

module.exports = { mod: new HideoutArchitect() };