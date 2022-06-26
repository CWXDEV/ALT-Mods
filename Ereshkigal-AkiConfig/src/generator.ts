/*
エレシュキガル
*/

"use strict";

class generator {
    static createConfig(file) {
        const mod = require("../../package.json");
        this.firstRun = true;
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
                "Hideout": {},
            },
            "Raids values": {
                "Loot values": {},
                "Airdrop values": {},
            },
            "Traders values": {
                "Traders": {},
                "Repair": {},
                "Insurances": {},
                "Trading": {},
            },
            "FleaMarket configuration": {},
            "Weather values": {},
        };
        dailyConfig = {};
        pmcConfig = {};

        //We will have to gather every config that exists atm and throw them together into the object
        const bots = BotConfig;
        const health = HealthConfig;
        const hideout = HideoutConfig;
        const http = HttpConfig;
        const inraid = InraidConfig;
        const insurance = InsuranceConfig;
        const inventory = InventoryConfig;
        const location = LocationConfig;
        const quest = QuestConfig;
        const ragfair = RagfairConfig;
        const repair = RepairConfig;
        const trader = TraderConfig;
        const weather = WeatherConfig;
        //const airdrops = AirdropConfig

        //Sorting the bots config now
        Object.assign(pmcConfig, bots);

        //Sorting the health config
        Object.assign(config["Server values"]["Health"], health);

        //Sorting the hideout values
        Object.assign(config["Server values"]["Hideout"], hideout);

        //Sorting the http values
        Object.assign(config["Server values"]["HTTP"], http);

        //Sorting the inraid values
        Object.assign(config["Raids values"], inraid);

        //Sorting insurance values
        Object.assign(config["Traders values"]["Insurances"], insurance);

        //Sorting inventory values
        Object.assign(config["Traders values"]["Trading"], inventory);

        //Sorting location values
        Object.assign(config["Raids values"]["Loot values"], location);

        //Sorting airdrop values
        //Object.assign(config["Raids values"]["Airdrop values"], airdrops)

        //Sorting quest values
        Object.assign(dailyConfig, quest);

        //Sorting ragfair values
        Object.assign(config["FleaMarket configuration"], ragfair);

        //Sorting repair values
        Object.assign(config["Traders values"]["Repair"], repair);

        //Sorting trader values
        Object.assign(config["Traders values"]["Traders"], trader);

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
            VFS.writeFile(
                `${ModLoader.getModPath(mod.name)}config/config.json`,
                JsonUtil.serialize(config, true)
            );
            VFS.writeFile(
                `${ModLoader.getModPath(mod.name)}config/dailyConfig.json`,
                JsonUtil.serialize(dailyConfig, true)
            );
            VFS.writeFile(
                `${ModLoader.getModPath(mod.name)}config/pmcConfig.json`,
                JsonUtil.serialize(pmcConfig, true)
            );
        }
        else
        {
            Logger.warning(`[AKI-CONFIG] - Generating ${file} file`)
            let toWrite = null
            if(file === "config"){toWrite = config}else if(file === 'dailyConfig'){toWrite = dailyConfig}else if(file === 'pmcConfig'){toWrite = pmcConfig}
            VFS.writeFile(
                `${ModLoader.getModPath(mod.name)}config/${file}.json`,
                JsonUtil.serialize(toWrite, true)
            );
        }
        Logger.error("[AKI-Config]: New configuration file created, please restart your server to use it.");
    }

    static checkConfigExisting() {
        const mod = require("../../package.json");
        const modPath = ModLoader.getModPath(mod.name);
        const validation = [];

        //Check if config folder exists
        if (VFS.exists(`${modPath}config`)) {
            //Check if all the config folder exists
            const fileList = VFS.getFiles(`${modPath}config/`);
            for (const file in fileList) {
                let fileName = fileList[file];
                if (fileName === "config.json") {
                    validation.push('config');
                }
                if (fileName === "dailyConfig.json") {
                    validation.push("dailyConfig");
                }
                if (fileName === "pmcConfig.json") {
                    validation.push("pmcConfig");
                }
            }
            //All configurations files existing
            if ((validation.length === 3)) {
                Logger.success(
                    `[AKI-CONFIG] - All configurations files already created, all green.`
                );
            } else {
                //One of the 3 file is missing, we only want to regenerate the missing one
                Logger.error(
                    `[AKI-CONFIG] - A config file is missing. Generating the missing file`
                );
                
                if (validation.includes("config")) {} else {
                    this.createConfig("config");
                }
                if (validation.includes("dailyConfig")) {} else {
                    this.createConfig("dailyConfig");
                }
                if (validation.includes("pmcConfig")) {} else {
                    this.createConfig("pmcConfig");
                }
            }
        } else {
            Logger.warning(
                "First time AKI-Configurator is run, generating the config file..."
            );
            this.createConfig(null);
        }
    }
}

module.exports = generator;