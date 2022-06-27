import { inject, injectable } from "tsyringe";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { IWeatherConfig } from "@spt-aki/models/spt/config/IWeatherConfig";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { AkiConfigHandler } from "./AkiConfigHandler";

@injectable()
export class Weather
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
        const weatherValues = this.configServer.getConfig<IWeatherConfig>(ConfigTypes.WEATHER);

        weatherValues.acceleration = config["Weather values"].acceleration;
        weatherValues.weather.clouds.min = config["Weather values"].weather.clouds.min;
        weatherValues.weather.clouds.max = config["Weather values"].weather.clouds.max;
        weatherValues.weather.windSpeed.min = config["Weather values"].weather.windSpeed.min;
        weatherValues.weather.windSpeed.max = config["Weather values"].weather.windSpeed.max;
        weatherValues.weather.windDirection.min = config["Weather values"].weather.windDirection.min;
        weatherValues.weather.windDirection.max = config["Weather values"].weather.windDirection.max;
        weatherValues.weather.windGustiness.min = config["Weather values"].weather.windGustiness.min;
        weatherValues.weather.windGustiness.max = config["Weather values"].weather.windGustiness.max;
        weatherValues.weather.rain.min = config["Weather values"].weather.rain.min;
        weatherValues.weather.rain.max = config["Weather values"].weather.rain.max;
        weatherValues.weather.rainIntensity.min = config["Weather values"].weather.rainIntensity.min;
        weatherValues.weather.rainIntensity.max = config["Weather values"].weather.rainIntensity.max;
        weatherValues.weather.fog.min = config["Weather values"].weather.fog.min;
        weatherValues.weather.fog.max = config["Weather values"].weather.fog.max;
        weatherValues.weather.temp.min = config["Weather values"].weather.temp.min;
        weatherValues.weather.temp.max = config["Weather values"].weather.temp.max;
        weatherValues.weather.pressure.min = config["Weather values"].weather.pressure.min;
        weatherValues.weather.pressure.max = config["Weather values"].weather.pressure.max;
    }
}
