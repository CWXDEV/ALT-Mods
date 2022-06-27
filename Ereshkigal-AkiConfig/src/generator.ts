import { inject, injectable } from "tsyringe";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
import { IHealthConfig } from "@spt-aki/models/spt/config/IHealthConfig";
import { IHideoutConfig } from "@spt-aki/models/spt/config/IHideoutConfig";
import { IHttpConfig } from "@spt-aki/models/spt/config/IHttpConfig";
import { IInRaidConfig } from "@spt-aki/models/spt/config/IInRaidConfig";
import { IInsuranceConfig } from "@spt-aki/models/spt/config/IInsuranceConfig";
import { IInventoryConfig } from "@spt-aki/models/spt/config/IInventoryConfig";
import { ILocationConfig } from "@spt-aki/models/spt/config/ILocationConfig";
import { IQuestConfig } from "@spt-aki/models/spt/config/IQuestConfig";
import { IRagfairConfig } from "@spt-aki/models/spt/config/IRagfairConfig";
import { IRepairConfig } from "@spt-aki/models/spt/config/IRepairConfig";
import { ITraderConfig } from "@spt-aki/models/spt/config/ITraderConfig";
import { IWeatherConfig } from "@spt-aki/models/spt/config/IWeatherConfig";
import { IAirdropConfig } from "@spt-aki/models/spt/config/IAirdropConfig";
import { VFS } from "@spt-aki/utils/VFS";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";

@injectable()
export class Generator 
{
    private pkg = require("../package.json");
 
    constructor(
        @inject("VFS") protected vfs: VFS,
        @inject("JsonUtil") protected jsonUtil: JsonUtil,
        @inject("ConfigServer") protected configServer: ConfigServer,
        @inject("WinstonLogger") private logger: ILogger
    )
    {}

    private createConfig(modPath: string, file: string): void 
    {
        let config = null;
        let dailyConfig = null;
        let pmcConfig = null;
        /*
            Generate the whole configuration on first run
            This way the default values are always up to date to AKI.
        */

        //The default file type must be an object
        config = {
            "Server values": {
                //"Enable Christmas Gifts": false,
                "HTTP": {},
                "Health": {},
                "Hideout": {}
            },
            "Raids values": {
                "Loot values": {},
                "Airdrop values": {}
            },
            "Traders values": {
                "Traders": {},
                "Repair": {},
                "Insurances": {},
                "Trading": {}
            },
            "FleaMarket configuration": {},
            "Weather values": {}
        };
        dailyConfig = {};
        pmcConfig = {};

        //We will have to gather every config that exists atm and throw them together into the object
        const bots = this.configServer.getConfig<IBotConfig>(ConfigTypes.BOT);
        const health = this.configServer.getConfig<IHealthConfig>(ConfigTypes.HEALTH);
        const hideout = this.configServer.getConfig<IHideoutConfig>(ConfigTypes.HIDEOUT);
        const http = this.configServer.getConfig<IHttpConfig>(ConfigTypes.HTTP);
        const inraid = this.configServer.getConfig<IInRaidConfig>(ConfigTypes.IN_RAID);
        const insurance = this.configServer.getConfig<IInsuranceConfig>(ConfigTypes.INSURANCE);
        const inventory = this.configServer.getConfig<IInventoryConfig>(ConfigTypes.INVENTORY);
        const location = this.configServer.getConfig<ILocationConfig>(ConfigTypes.LOCATION);
        const quest = this.configServer.getConfig<IQuestConfig>(ConfigTypes.QUEST);
        const ragfair = this.configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
        const repair = this.configServer.getConfig<IRepairConfig>(ConfigTypes.REPAIR);
        const trader = this.configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        const weather = this.configServer.getConfig<IWeatherConfig>(ConfigTypes.WEATHER);
        const airdrops = this.configServer.getConfig<IAirdropConfig>(ConfigTypes.AIRDROP);

        //Sorting the http values
        Object.assign(config["Server values"]["HTTP"], http);

        //Sorting the health config
        Object.assign(config["Server values"]["Health"], health);

        //Sorting the hideout values
        Object.assign(config["Server values"]["Hideout"], hideout);

        //Sorting the inraid values
        Object.assign(config["Raids values"], inraid);
        
        //Sorting location values
        Object.assign(config["Raids values"]["Loot values"], location);

        //Sorting airdrop values
        //Object.assign(config["Raids values"]["Airdrop values"], airdrops)

        //Sorting trader values
        Object.assign(config["Traders values"]["Traders"], trader);

        //Sorting repair values
        Object.assign(config["Traders values"]["Repair"], repair);

        //Sorting insurance values
        Object.assign(config["Traders values"]["Insurances"], insurance);

        //Sorting inventory values
        Object.assign(config["Traders values"]["Trading"], inventory);

        //Sorting quest values
        Object.assign(dailyConfig, quest);

        //Sorting the bots config now
        Object.assign(pmcConfig, bots);

        //Sorting ragfair values
        Object.assign(config["FleaMarket configuration"], ragfair);

        //Weather values
        Object.assign(config["Weather values"], weather);

        //Some personnal changes for end-user
        config["FleaMarket configuration"].traders = {
            EnablePraporOffers: true,
            EnableTheRapistOffers: true,
            EnableFenceOffers: false,
            EnableSkierOffers: true,
            EnablePeacekeeperOffers: true,
            EnableMechanicOffers: true,
            EnableRagmanOffers: true,
            EnableJaegerOffers: true,
            EnableAllAvailableOffers: false,
        };

        if (file === null) {
            //Write the config in the folder
            this.vfs.writeFile(
                `${modPath}config/config.json`,
                this.jsonUtil.serialize(config, true)
            );
            this.vfs.writeFile(
                `${modPath}config/dailyConfig.json`,
                this.jsonUtil.serialize(dailyConfig, true)
            );
            this.vfs.writeFile(
                `${modPath}config/pmcConfig.json`,
                this.jsonUtil.serialize(pmcConfig, true)
            );
        }
        else
        {
            this.logger.warning(`[AKI-CONFIG] - Generating ${file} file`)
            let toWrite = null
            if (file === "config")
            {
                toWrite = config
            }
            else if (file === 'dailyConfig')
            {
                toWrite = dailyConfig
            }
            else if (file === 'pmcConfig')
            {
                toWrite = pmcConfig
            }
            this.vfs.writeFile(
                `${modPath}config/${file}.json`,
                this.jsonUtil.serialize(toWrite, true)
            );
        }
        this.logger.error("[AKI-Config]: New configuration file created, please restart your server to use it.");
    }

    public checkConfigExisting(modPath: string): void 
    {
        const validation = [];

        //Check if config folder exists
        if (this.vfs.exists(`${modPath}config`)) 
        {
            //Check if all the config folder exists
            const fileList = this.vfs.getFiles(`${modPath}config/`);
            for (const file in fileList) 
            {
                const fileName = fileList[file];
                if (fileName === "config.json") 
                {
                    validation.push("config");
                }
                if (fileName === "dailyConfig.json") 
                {
                    validation.push("dailyConfig");
                }
                if (fileName === "pmcConfig.json") 
                {
                    validation.push("pmcConfig");
                }
            }
            //All configurations files existing
            if ((validation.length === 3)) 
            {
                this.logger.success(
                    "[AKI-CONFIG] - All configurations files already created, all green."
                );
            } 
            else 
            {
                //One of the 3 file is missing, we only want to regenerate the missing one
                this.logger.error(
                    "[AKI-CONFIG] - A config file is missing. Generating the missing file"
                );
                
                if (!validation.includes("config")) 
                {
                    this.createConfig(modPath, "config");
                }
                if (!validation.includes("dailyConfig"))
                {
                    this.createConfig(modPath, "dailyConfig");
                }
                if (!validation.includes("pmcConfig"))
                {
                    this.createConfig(modPath, "pmcConfig");
                }
            }
        } 
        else 
        {
            this.logger.warning(
                "First time AKI-Configurator is run, generating the config file..."
            );
            this.createConfig(modPath, null);
        }
    }
}