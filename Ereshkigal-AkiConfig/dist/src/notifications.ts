import { inject, injectable } from "tsyringe";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { AkiConfigHandler } from "./AkiConfigHandler";

@injectable()
export class Notifications
{
    constructor(
        @inject("WinstonLogger") private logger: ILogger,
        @inject("AkiConfigHandler") private configHandler: AkiConfigHandler
    )
    {}

    public sendNotifications(): void
    {
        const config = this.configHandler.getConfig();
        const locale = this.configHandler.getLocales();
        
        if (!config.other.hideWarningMessage)
        {
            this.logger.log("[AIO Config INFORMATION]", "yellow");
            this.logger.info("Please read the AKICONFIG README.pdf carefully as this has all the information you need.");
            this.logger.log("[AIO Config INFORMATION]", "yellow");
        }


    }
}