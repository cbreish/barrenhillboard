"use strict"

var schedule = require('node-schedule');
var ForecastIo = require('forecastio');
var secrets = require('./../secrets');

class CurrentWeather {
    temp: number;
    description: string;
    feelsLike: number;
    nextHour: string;
    nextDay: string;
}

class Weather {
    private bus: any;
    private currentWeather: CurrentWeather;

    constructor(bus: any) {
        this.currentWeather = new CurrentWeather();

        var instance = this;

        instance.getWeather();
        bus.subscribe({ event: 'userConnected' }, instance.updateWidgets);

        schedule.scheduleJob('*/5 * * * *', function () {
            instance.getWeather();
            instance.updateWidgets();
        });

        this.bus = bus;
    }

    getWeather = () => {
        var forecastIo = new ForecastIo(secrets.ForecastIoApiKey);
        var instance = this;
        forecastIo.forecast('40.0848523', '-75.2493311', function (err, data) {
            if (err) {
                console.log("Error fetching forcecast.io data: " + err);
            } else {
                instance.currentWeather.temp = Math.round(data.currently.temperature);
                instance.currentWeather.description = data.currently.summary;
                instance.currentWeather.feelsLike = Math.round(data.currently.apparentTemperature);
                instance.currentWeather.nextHour = data.minutely.summary;
                instance.currentWeather.nextDay = data.hourly.summary;
            }
        });
    }

    updateWidgets = () => {
        console.log('Updating weather');
        this.bus.post({
            event: 'widgetUpdate',
            messageType: 'weather:update',
            messageData:  this.currentWeather
        });
    }
}

exports.Weather = Weather;