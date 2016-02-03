"use strict";
var every = require('schedule').every;
var ForecastIo = require('forecastio');
var secrets = require('./../secrets');
class CurrentWeather {
}
class Weather {
    constructor(bus) {
        this.getWeather = () => {
            var forecastIo = new ForecastIo(secrets.ForecastIoApiKey);
            var instance = this;
            console.log('Fetching forecast.io data');
            forecastIo.forecast('40.0848523', '-75.2493311', function (err, data) {
                if (err) {
                    console.log("Error fetching forcecast.io data: " + err);
                }
                else {
                    console.log('Finished fetching forecast.io data');
                    instance.currentWeather.temp = Math.round(data.currently.temperature);
                    instance.currentWeather.description = data.currently.summary;
                    instance.currentWeather.icon = data.currently.icon;
                    instance.currentWeather.feelsLike = Math.round(data.currently.apparentTemperature);
                    instance.currentWeather.nextHour = data.minutely.summary;
                    instance.currentWeather.nextDay = data.hourly.summary;
                }
            });
        };
        this.updateWidgets = () => {
            console.log('Updating weather');
            this.bus.post({
                event: 'widgetUpdate',
                messageType: 'weather:update',
                messageData: this.currentWeather
            });
        };
        this.currentWeather = new CurrentWeather();
        var instance = this;
        instance.getWeather();
        bus.subscribe({ event: 'userConnected' }, instance.updateWidgets);
        every('5m').do(function () {
            instance.getWeather();
            instance.updateWidgets();
        });
        this.bus = bus;
    }
}
exports.Weather = Weather;
//# sourceMappingURL=weather.js.map