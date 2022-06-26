/*
エレシュキガル
*/

"use strict";

class raids
{
    static applyValues()
    {
        const inraid = InraidConfig;
        const config = require('../../config/config.json');

        for(const options in inraid)
        {
            inraid[options] = config["Raids values"][options];
        }
        
        LocationConfig = config['Raids values']['Loot values'];
        AirdropConfig = config['Raids values']['Airdrop values']

    }
}

module.exports = raids;