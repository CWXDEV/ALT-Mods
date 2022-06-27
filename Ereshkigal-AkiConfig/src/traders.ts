import { inject, injectable } from "tsyringe";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { IInsuranceConfig } from "@spt-aki/models/spt/config/IInsuranceConfig";
import { IInventoryConfig } from "@spt-aki/models/spt/config/IInventoryConfig";
import { IRepairConfig } from "@spt-aki/models/spt/config/IRepairConfig";
import { ITraderConfig } from "@spt-aki/models/spt/config/ITraderConfig";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { AkiConfigHandler } from "./AkiConfigHandler";

@injectable()
export class Traders 
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
        const insurance = this.configServer.getConfig<IInsuranceConfig>(ConfigTypes.INSURANCE);
        const inventory = this.configServer.getConfig<IInventoryConfig>(ConfigTypes.INVENTORY);
        const repair = this.configServer.getConfig<IRepairConfig>(ConfigTypes.REPAIR);
        const trader = this.configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        
        for (const options in insurance)
        {
            insurance[options] = config["Traders values"].Insurances[options];
        }

        for (const options in inventory)
        {
            inventory[options] = config["Traders values"].Trading[options];
        }

        for (const options in repair)
        {
            repair[options] = config["Traders values"].Repair[options];
        }

        for (const options in trader)
        {
            trader[options] = config["Traders values"].Traders[options];
        }
    }
}
