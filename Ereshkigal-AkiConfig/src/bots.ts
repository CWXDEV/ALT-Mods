/*
エレシュキガル
*/

"use strict";

class bots
{
    static applyValues()
    {
        const bots = BotConfig;
        const config = require('../../config/pmcConfig.json');

        const pmcsConfig = config.pmc.types
        for (const bot in pmcsConfig) {
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