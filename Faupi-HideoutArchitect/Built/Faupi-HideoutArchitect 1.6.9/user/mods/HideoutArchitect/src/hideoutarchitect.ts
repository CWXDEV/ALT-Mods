import type { DependencyContainer } from "tsyringe";
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { IPostAkiLoadMod } from "@spt-aki/models/external/IPostAkiLoadMod";
import { DynamicRouterModService } from "@spt-aki/services/mod/dynamicRouter/DynamicRouterModService"
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer"
import { JsonUtil } from "@spt-aki/utils/JsonUtil"
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";

class HideoutArchitect implements IPreAkiLoadMod, IPostAkiLoadMod
{
    private path;
    private database: DatabaseServer;
    private router: DynamicRouterModService;
    private json: JsonUtil;
    private globalLocale;
    private modLoader: PreAkiModLoader;
    private mod;
    private translations;
    private table;

    public preAkiLoad(container: DependencyContainer)
    {
        this.router = container.resolve<DynamicRouterModService>("DynamicRouterModService");
        this.path = require("path");
        this.json = container.resolve<JsonUtil>("JsonUtil");
        this.mod = require("../package.json");
        this.translations = require("../res/translations.json");
        this.hookRoutes();

    }

    public postAkiLoad(container: DependencyContainer)
    {
        this.modLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
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

                this.globalLocale[language][attrKey] = attrValue;
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

        modOutput.data = {...this.mod, ...{path: this.path.resolve(this.modLoader.getModPath("HideoutArchitect"))}};
        modOutput.status = 0;
        
        return this.json.serialize(modOutput);
    }
}

module.exports = { mod: new HideoutArchitect() };