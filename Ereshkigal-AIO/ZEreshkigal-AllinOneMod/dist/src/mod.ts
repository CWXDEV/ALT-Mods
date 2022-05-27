import { DependencyContainer, Lifecycle } from "tsyringe";
import type { StaticRouterModService } from "../types/services/mod/staticRouter/StaticRouterModService";
import type { IMod } from "../types/models/external/mod";
import type { ILogger } from "../types/models/spt/utils/ILogger";
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
        container.resolve<ILogger>("WinstonLogger");
        
        if (container.resolve<AIOConfigHandler>("AIOConfigHandler").getConfig().player.allSkillsMaster) 
        {
            staticRoute.registerStaticRouter(
                "AIOModGameVersion",
                [
                    {
                        url: "/client/game/version/validate",
                        action: (sessionID: string): any => 
                        {
                            return container.resolve<Player>("AIOPlayer").maxSkills(sessionID);
                        }
                    }
                ],
                "AIOMod"
            )
        }

        if (container.resolve<AIOConfigHandler>("AIOConfigHandler").getConfig().other.preWipeEvents.raidersOnAllMaps)
        {
            staticRoute.registerStaticRouter(
                "AIOModBotGen",
                [
                    {
                        url: "/client/game/bot/generate",
                        action: (info: any): any => 
                        {
                            return container.resolve<Other>("AIOOther").spawnRaidersEverywhere(info);
                        }
                    }
                ],
                "AIOMod"
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
        container.resolve<Traders>("AIOTrader").applyChanges();
        container.resolve<Player>("AIOPlayer").applyChanges();

        if (container.resolve<AIOConfigHandler>("AIOConfigHandler").getConfig().other.showModLogs)
        {
            container.resolve<Notifications>("AIONotifications").sendNotifications()
        }
    }
}

module.exports = { mod: new AIOMod() };