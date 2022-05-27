import { injectable } from "tsyringe";
import { IConfig } from "../models/IConfig";
import { ILocale } from "../models/ILocale";

@injectable()
export class AIOConfigHandler
{
    private config: IConfig;
    private locales: ILocale;

    constructor()
    {
        this.config = require("../config/config.json");
        this.locales = require("../locale/locale.json")
    }

    public getConfig(): IConfig
    {
        return this.config;
    }

    public getLocales(): ILocale
    {
        return this.locales;
    }
}