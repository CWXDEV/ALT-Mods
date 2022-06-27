import { injectable } from "tsyringe";
import { IConfig } from "../models/IConfig";
import { IDailyConfig } from "../models/IDailyConfig";
import { IPmcConfig } from "../models/IPmcConfig";
import { ILocale } from "../models/ILocale";
import { IDailyLocale } from "../models/IDailyLocale";
import { IPmcLocale } from "../models/IPmcLocale";

@injectable()
export class AkiConfigHandler
{
    private config: IConfig;
    private dailyConfig: IDailyConfig;
    private pmcConfig: IPmcConfig;
    private locales: ILocale;
    private dailyLocales: IDailyLocale;
    private pmcLocales: IPmcLocale;

    constructor()
    {
        this.config = require("../config/config.json");
        this.dailyConfig = require("../config/dailyConfig.json");
        this.pmcConfig = require("../config/pmcConfig.json");
        this.locales = require("../locale/locale.json");
        this.dailyLocales = require("../locale/dailyLocale.json");
        this.pmcLocales = require("../locale/pmcLocale.json");
    }

    public getConfig(): IConfig
    {
        return this.config;
    }

    public getDailyConfig(): IDailyConfig
    {
        return this.dailyConfig;
    }
    
    public getPmcConfig(): IPmcConfig
    {
        return this.pmcConfig;
    }
    
    public getLocales(): ILocale
    {
        return this.locales;
    }

    public getDailyLocales(): IDailyLocale
    {
        return this.dailyLocales;
    }

    public getPmcLocales(): IPmcLocale
    {
        return this.pmcLocales;
    }
}