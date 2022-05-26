import type { DependencyContainer } from "tsyringe";
import { IMod } from "../types/models/external/mod";
import { ILogger } from "../types/models/spt/utils/ILogger";
import { IConfig } from "../models/IConfig"
import { ILocale } from "../models/ILocale"
import { Other } from "./other";
import { Items } from "./items";
import { Raids } from "./raids";
import { Traders } from "./traders";
import { Player } from "./player";
import { Notifications } from "./Notifications";
import { Fixes } from "./fixes";
import { HttpResponseUtil } from "../types/utils/HttpResponseUtil";
import { BotController } from "../types/controllers/BotController";
import { DatabaseServer } from "../types/servers/DatabaseServer";
import { ProfileHelper } from "../types/helpers/ProfileHelper";
import { StaticRouterModService } from "../types/services/mod/staticRouter/StaticRouterModService";

class AIOMod implements IMod
{
    private logger: ILogger;
    private pkg;
    private config: IConfig;
    private locale: ILocale;
    private other: Other;
    private items: Items;
    private raids: Raids;
    private traders: Traders;
    private players: Player;
    private notifications: Notifications;
    private fixes: Fixes;
    private httpResponse: HttpResponseUtil;
    private botController: BotController;
    private database: DatabaseServer;
    private profileHelper: ProfileHelper;

    public load(container: DependencyContainer): void
    {
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.httpResponse = container.resolve<HttpResponseUtil>("HttpResponseUtil");
        this.botController = container.resolve<BotController>("BotController");
        this.profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
        const staticRoute = container.resolve<StaticRouterModService>("StaticRouterModService");
        
        if (this.config.player.allSkillsMaster) 
        {
            staticRoute.registerStaticRouter(
                "AIOModGameVersion",
                [
                    {
                        url: "/client/game/version/validate",
                        action: (url: string, info: any, sessionID: string, output: string): any => {
                            return this.players.maxSkills(sessionID, this.profileHelper)
                        }
                    }
                ],
                "AIOMod"
            )
        }

        if (this.config.other.preWipeEvents.raidersOnAllMaps)
        {
            staticRoute.registerStaticRouter(
                "AIOModBotGen",
                [
                    {
                        url: "/client/game/bot/generate",
                        action: (url: string, info: any, sessionID: string, output: string): any => {
                            return this.other.SpawnRaidersEverywhere(info)
                        }
                    }
                ],
                "AIOMod"
            ) 
        }

        this.pkg = require("../package.json");
        this.config = require("../config/config.json");
        this.locale = require("../locale/locale.json");

        this.logger.info(`Loading: ${this.pkg.name} ${this.pkg.version}`);
    }

    public delayedLoad(container: DependencyContainer): void
    {
        this.database = container.resolve<DatabaseServer>("DatabaseServer");

        this.other = new Other(this.config, this.httpResponse, this.botController);
        this.items = new Items(this.logger, this.config, this.database, this.other);
        this.raids = new Raids(this.config, this.database, this.other);
        this.traders = new Traders(this.logger, this.config, this.database, this.other);
        this.players = new Player(this.logger, this.database, this.config, this.httpResponse);
        this.notifications = new Notifications(this.logger, this.config, this.locale, this.other);
        this.fixes = new Fixes(this.config, this.database);

        this.other.ApplyChanges()
        this.items.ApplyChanges()
        this.raids.ApplyChanges()
        this.traders.ApplyChanges()
        this.players.ApplyChanges()
        this.fixes.ApplyChanges()

        if (this.config.other.showModLogs)
        {
            this.notifications.SendNotifications()
        }
    }
}

module.exports = { mod: new AIOMod() };