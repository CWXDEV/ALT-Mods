import { WeightedRandomHelper } from "../helpers/WeightedRandomHelper";
import { ConfigServer } from "../servers/ConfigServer";
import { IWeatherData } from "../models/eft/weather/IWeatherData";
import { IWeatherConfig } from "../models/spt/config/IWeatherConfig";
import { RandomUtil } from "../utils/RandomUtil";
import { TimeUtil } from "../utils/TimeUtil";
export declare class WeatherGenerator {
    protected weightedRandomHelper: WeightedRandomHelper;
    protected randomUtil: RandomUtil;
    protected timeUtil: TimeUtil;
    protected configServer: ConfigServer;
    protected weatherConfig: IWeatherConfig;
    constructor(weightedRandomHelper: WeightedRandomHelper, randomUtil: RandomUtil, timeUtil: TimeUtil, configServer: ConfigServer);
    calculateTime(data: IWeatherData): IWeatherData;
    generateWeather(data: IWeatherData): IWeatherData;
    protected getWeightedFog(): string;
    protected getWeightedRain(): number;
    protected getRandomFloat(node: string): number;
    protected getRandomInt(node: string): number;
}
