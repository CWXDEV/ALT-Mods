import { inject, injectable } from "tsyringe";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { AkiConfigHandler } from "./AkiConfigHandler";

@injectable()
export class Bots
{
    constructor(
        @inject("AkiConfigHandler") protected configHandler: AkiConfigHandler,
        @inject("ConfigServer") protected configServer: ConfigServer,
        @inject("WinstonLogger") private logger: ILogger
    )
    {}
    
    public applyChanges(): void
    {
        const pmcConfig = this.configHandler.getPmcConfig();
        const bots = this.configServer.getConfig<IBotConfig>(ConfigTypes.BOT);

        for (const bot in pmcConfig.pmc.types) 
        {
            switch (bot) 
            {
                default:
                    bots.pmc.types[bot] = pmcConfig.pmc.types[bot];
                    break;
            }
        }

        for (const options in pmcConfig.pmc)
        {
            switch (options)
            {
                case "types":
                    break;
                default:
                    bots.pmc[options] = pmcConfig.pmc[options];
                    break;
            }
        }

        for (const bot in pmcConfig.presetBatch) 
        {
            bots.presetBatch[bot] = pmcConfig.presetBatch[bot];
        }
    }
}
