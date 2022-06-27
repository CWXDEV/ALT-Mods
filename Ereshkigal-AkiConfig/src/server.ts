import { inject, injectable } from "tsyringe";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { IHealthConfig } from "@spt-aki/models/spt/config/IHealthConfig";
import { IHideoutConfig } from "@spt-aki/models/spt/config/IHideoutConfig";
import { IHttpConfig } from "@spt-aki/models/spt/config/IHttpConfig";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { AkiConfigHandler } from "./AkiConfigHandler";

@injectable()
export class Server
{
    constructor(
        @inject("AkiConfigHandler") protected configHandler: AkiConfigHandler,
        @inject("ConfigServer") protected configServer: ConfigServer,
        @inject("WinstonLogger") private logger: ILogger
    )
    {}

    public applyChanges(): void
    {
        const config = this.configHandler.getConfig();
        const serverConfig = this.configServer.getConfig<IHttpConfig>(ConfigTypes.HTTP);
        const healthConfig = this.configServer.getConfig<IHealthConfig>(ConfigTypes.HEALTH);
        const hideoutConfig = this.configServer.getConfig<IHideoutConfig>(ConfigTypes.HIDEOUT);
        
        serverConfig.ip = config["Server values"].HTTP.ip;
        serverConfig.port = config["Server values"].HTTP.port;

        healthConfig.healthMultipliers = config["Server values"].Health.healthMultipliers;
        healthConfig.save = config["Server values"].Health.save;

        hideoutConfig.runIntervalSeconds = config["Server values"].Hideout.runIntervalSeconds;
        hideoutConfig.scavCase = config["Server values"].Hideout.scavCase;
        hideoutConfig.fuelDrainRateMultipler = config["Server values"].Hideout.fuelDrainRateMultipler;
    }
}
