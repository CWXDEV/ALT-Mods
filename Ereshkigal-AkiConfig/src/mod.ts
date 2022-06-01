import { DependencyContainer, Lifecycle } from "tsyringe";
import type { IMod } from "@spt-aki/models/external/mod";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";

class AkiConfig implements IMod
{
    private logger: ILogger;
    private pkg;

    public load(container: DependencyContainer): void
    {
        this.logger = container.resolve<ILogger>("WinstonLogger");

        this.pkg = require("../package.json");
        this.logger.info(`Loading: ${this.pkg.name} ${this.pkg.version}`);
    }

    public delayedLoad(container: DependencyContainer): void
    {
        return;
    }
}

module.exports = { mod: new AkiConfig() };