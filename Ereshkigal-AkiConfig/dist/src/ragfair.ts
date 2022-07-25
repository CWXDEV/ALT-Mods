import { inject, injectable } from "tsyringe";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { IRagfairConfig } from "@spt-aki/models/spt/config/IRagfairConfig";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { Traders } from "@spt-aki/models/enums/Traders";
import { AkiConfigHandler } from "./AkiConfigHandler";

@injectable()
export class Ragfair
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
        const ragfair = this.configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);

        for (const options in ragfair.sell)
        {
            ragfair.sell[options] = config["FleaMarket configuration"].sell[options];
        }

        for (const options in ragfair.dynamic)
        {
            ragfair.dynamic[options] = config["FleaMarket configuration"].dynamic[options];
        }

        const traderList = config["FleaMarket configuration"].traders;
        for (const trader in config["FleaMarket configuration"].traders) 
        {
            switch (trader) 
            {
                case "EnablePraporOffers":
                    ragfair.traders[Traders.PRAPOR] = traderList.EnablePraporOffers;
                    break;
                case "EnableTheRapistOffers":
                    ragfair.traders[Traders.THERAPIST] = traderList.EnableTheRapistOffers;
                    break;
                case "EnableFenceOffers":
                    ragfair.traders[Traders.FENCE] = traderList.EnableFenceOffers;
                    break;
                case "EnableSkierOffers":
                    ragfair.traders[Traders.SKIER] = traderList.EnableSkierOffers;
                    break;
                case "EnablePeacekeeperOffers":
                    ragfair.traders[Traders.PEACEKEEPER] = traderList.EnablePeacekeeperOffers;
                    break;
                case "EnableMechanicOffers":
                    ragfair.traders[Traders.MECHANIC] = traderList.EnableMechanicOffers;
                    break;
                case "EnableRagmanOffers":
                    ragfair.traders[Traders.RAGMAN] = traderList.EnableRagmanOffers;
                    break;
                case "EnableJaegerOffers":
                    ragfair.traders[Traders.JAEGER] = traderList.EnableJaegerOffers;
                    break;
                case "EnableAllAvailableOffers":
                    ragfair.traders["ragfair"] = traderList.EnableAllAvailableOffers;
                    break;
                default:
                    ragfair.traders[trader] = traderList[trader];
                    break;
            }
        }
    }
}
