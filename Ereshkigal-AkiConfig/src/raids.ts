import { inject, injectable } from "tsyringe";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { IInRaidConfig } from "@spt-aki/models/spt/config/IInRaidConfig";
import { ILocationConfig } from "@spt-aki/models/spt/config/ILocationConfig";
import { IAirdropConfig } from "@spt-aki/models/spt/config/IAirdropConfig";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { AkiConfigHandler } from "./AkiConfigHandler";

@injectable()
export class Raids
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
        const locationConfig = this.configServer.getConfig<ILocationConfig>(ConfigTypes.LOCATION);
        const airdropConfig = this.configServer.getConfig<IAirdropConfig>(ConfigTypes.AIRDROP);
        const inRaidConfig = this.configServer.getConfig<IInRaidConfig>(ConfigTypes.IN_RAID);
        
        locationConfig.looseLootMultiplier = config["Raids values"]["Loot values"].looseLootMultiplier;
        locationConfig.staticLootMultiplier = config["Raids values"]["Loot values"].staticLootMultiplier;
        
        for (const options in airdropConfig)
        {
            airdropConfig[options] = config["Raids values"]["Airdrop values"][options];
        }

        for (const options in inRaidConfig)
        {
            inRaidConfig[options] = config["Raids values"][options];
        }        
    }
}
