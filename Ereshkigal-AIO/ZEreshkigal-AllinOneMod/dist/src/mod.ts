import { DependencyContainer, Lifecycle } from "tsyringe";
import type { StaticRouterModService } from "@spt-aki/services/mod/staticRouter/StaticRouterModService";
import type { IMod } from "@spt-aki/models/external/mod";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { Other } from "./other";
import { Items } from "./items";
import { Raids } from "./raids";
import { Traders } from "./traders";
import { Player } from "./player";
import { Notifications } from "./Notifications";
import { Fixes } from "./fixes";
import { AIOConfigHandler } from "./AIOConfigHandler";

class AIOMod implements IMod
{
    private logger: ILogger;
    private pkg;

    public load(container: DependencyContainer): void
    {
        container.register<AIOConfigHandler>("AIOConfigHandler", AIOConfigHandler, {lifecycle:Lifecycle.Singleton});
        container.register<Other>("AIOOther", Other, {lifecycle:Lifecycle.Singleton});
        container.register<Fixes>("AIOFixes", Fixes);
        container.register<Raids>("AIORaids", Raids);
        container.register<Items>("AIOItems", Items);
        container.register<Traders>("AIOTraders", Traders);
        container.register<Player>("AIOPlayer", Player);
        container.register<Notifications>("AIONotifications", Notifications);
        const staticRoute = container.resolve<StaticRouterModService>("StaticRouterModService");
        this.logger = container.resolve<ILogger>("WinstonLogger");
        
        if (container.resolve<AIOConfigHandler>("AIOConfigHandler").getConfig().player.allSkillsMaster) 
        {
            staticRoute.registerStaticRouter(
                "AIOModGameVersion",
                [
                    {
                        url: "/client/game/version/validate",
                        action: (url: string, info: any, sessionID: string, output: string): any => 
                        {       
                            this.logger.info(sessionID);
                            return container.resolve<Player>("AIOPlayer").maxSkills(sessionID);
                        }
                    }
                ],
                "aki"
            )
        }

        if (container.resolve<AIOConfigHandler>("AIOConfigHandler").getConfig().other.preWipeEvents.raidersOnAllMaps)
        {
            staticRoute.registerStaticRouter(
                "AIOModBotGen",
                [
                    {
                        url: "/client/game/bot/generate",
                        action: (url: string, info: any, sessionID: string, output: string): any => 
                        {
                            return container.resolve<Other>("AIOOther").spawnRaidersEverywhere(info);
                        }
                    }
                ],
                "aki"
            ) 
        }

        this.pkg = require("../package.json");
        this.logger.info(`Loading: ${this.pkg.name} ${this.pkg.version}`);
    }

    public delayedLoad(container: DependencyContainer): void
    {
        container.resolve<Other>("AIOOther").applyChanges();
        container.resolve<Fixes>("AIOFixes").applyChanges();
        container.resolve<Raids>("AIORaids").applyChanges();
        container.resolve<Items>("AIOItems").applyChanges();
        container.resolve<Traders>("AIOTraders").applyChanges();
        container.resolve<Player>("AIOPlayer").applyChanges();

        if (container.resolve<AIOConfigHandler>("AIOConfigHandler").getConfig().other.showModLogs)
        {
            container.resolve<Notifications>("AIONotifications").sendNotifications()
        }
    }
}

module.exports = { mod: new AIOMod() };