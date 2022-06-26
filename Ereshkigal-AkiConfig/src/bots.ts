import { inject, injectable } from "tsyringe";
import type { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
import { AkiConfigHandler } from "./AkiConfigHandler";

@injectable()
export class bots
{
    constructor(
        @inject("AkiConfigHandler") private configHandler: AkiConfigHandler,
        @inject("DatabaseServer") private database: DatabaseServer
    )
    {}
    
    public applyChanges(): void
    {
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const BotConfig = configServer.getConfig<IBotConfig>(ConfigTypes.BOT);

        const pmcsConfig = this.configHandler.getPmcConfig().pmc.types
        for (const bot in pmcsConfig) 
        {
            switch (bot) {
                default:
                    bots.pmc.types[bot] = pmcsConfig[bot]
                    break;
            }
        }

        for(const options in config.pmc){
            switch(options){
                case "types":
                    break;
                default:
                    bots.pmc[options] = config.pmc[options]
                    break;
            }
        }

        for (const bot in config.presetBatch) {
            bots.presetBatch[bot] = config.presetBatch[bot]
        }
    }
}

module.exports = bots;