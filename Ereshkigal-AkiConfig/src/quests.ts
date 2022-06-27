import { inject, injectable } from "tsyringe";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { IQuestConfig } from "@spt-aki/models/spt/config/IQuestConfig";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { AkiConfigHandler } from "./AkiConfigHandler";

@injectable()
export class Quests
{
    constructor(
        @inject("AkiConfigHandler") protected configHandler: AkiConfigHandler,
        @inject("ConfigServer") protected configServer: ConfigServer,
        @inject("WinstonLogger") private logger: ILogger
    )
    {}

    public applyChanges(): void
    {
        const dailyConfig = this.configHandler.getDailyConfig();
        const questConfig = this.configServer.getConfig<IQuestConfig>(ConfigTypes.QUEST);

        questConfig.redeemTime = dailyConfig.redeemTime;
        questConfig.repeatableQuests = dailyConfig.repeatableQuests;
    }
}
