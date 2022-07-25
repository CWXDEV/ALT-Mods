import { DependencyContainer, Lifecycle } from "tsyringe";
import type { IMod } from "@spt-aki/models/external/mod";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { InitialModLoader } from "@spt-aki/loaders/InitialModLoader";
import { Generator } from "./generator";
import { Ragfair } from "./ragfair";
import { Weather } from "./weather";
import { Bots } from "./bots";
import { Raids } from "./raids";
import { Server } from "./server";
import { Traders } from "./traders";
import { Quests } from "./quests";
import { Notifications } from "./notifications";
import { AkiConfigHandler } from "./AkiConfigHandler";

class AkiConfig implements IMod
{
    private logger: ILogger;
    private pkg;

    public load(container: DependencyContainer): void
    {
        container.register<AkiConfigHandler>("AkiConfigHandler", AkiConfigHandler, {lifecycle:Lifecycle.Singleton});
        container.register<Generator>("Generator", Generator);
        container.register<Ragfair>("Ragfair", Ragfair);
        container.register<Weather>("Weather", Weather);
        container.register<Bots>("Bots", Bots);
        container.register<Raids>("Raids", Raids);
        container.register<Server>("Server", Server);
        container.register<Traders>("Traders", Traders);
        container.register<Quests>("Quests", Quests);
        container.register<Notifications>("Notifications", Notifications);

        this.logger = container.resolve<ILogger>("WinstonLogger");

        this.pkg = require("../package.json");
        this.logger.info(`Loading: ${this.pkg.name} ${this.pkg.version}`);
    }

    public delayedLoad(container: DependencyContainer): void
    {
        const initialModLoader = container.resolve<InitialModLoader>("InitialModLoader");
        const modPath = `./${initialModLoader.getModPath(this.pkg.name)}`;
        
        container.resolve<Generator>("Generator").checkConfigExisting(modPath);
        container.resolve<Ragfair>("Ragfair").applyChanges();
        container.resolve<Weather>("Weather").applyChanges();
        container.resolve<Bots>("Bots").applyChanges();
        container.resolve<Raids>("Raids").applyChanges();
        container.resolve<Server>("Server").applyChanges();
        container.resolve<Traders>("Traders").applyChanges();
        container.resolve<Quests>("Quests").applyChanges();
        
        if (container.resolve<AkiConfigHandler>("AkiConfigHandler").getConfig().other.showModLogs)
        {
            container.resolve<Notifications>("Notifications").sendNotifications()
        }        
    }
}

module.exports = { mod: new AkiConfig() };