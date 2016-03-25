"use strict";
require('es6-promise').polyfill();
var every = require('schedule').every;
var secrets = require('./../secrets');
var active911 = new (require('active911')).RefreshClient(secrets.Active911Token);
var moment = require('moment');
var Call = (function () {
    function Call() {
    }
    return Call;
})();
var LatestCalls = (function () {
    function LatestCalls(bus) {
        var _this = this;
        this.getCalls = function () {
            var instance = _this;
            active911.getAlerts().then(function (alerts) {
                Promise.all(alerts.map(function (alert) {
                    return active911.getAlert(alert.id);
                }))
                    .then(function (alertDetails) {
                    instance.calls = alertDetails.map(function (response) {
                        var call = new Call();
                        call.Type = instance.capitalizeFirstLetter(response.description);
                        var callTime = moment(response.sent).subtract(5, 'hours');
                        call.Time = callTime.format('dddd MMMM Do') + ' at ' + callTime.format('h:mm a');
                        call.Location = '';
                        if (response.place) {
                            call.Location += response.place + ', ';
                        }
                        call.Location += response.address + ', ';
                        call.Location += response.city;
                        call.Location = instance.capitalizeFirstLetter(call.Location);
						call.Latitude = response.latitude;
						call.Longitude = response.longitude;
						call.id = response.id;
                        return call;
                    });
                    instance.updateWidgets();
                });
            });
        };
        this.updateWidgets = function () {
            console.log('Updating latest calls');
            _this.bus.post({
                event: 'widgetUpdate',
                messageType: 'latest:update',
                messageData: { 
					calls: _this.calls,
					apiKey: secrets.MapBoxApiKey
				}
            });
        };
        var instance = this;
        this.getCalls();
        bus.subscribe({ event: 'userConnected' }, instance.updateWidgets);
        every('5m').do(function () {
            instance.getCalls();
        });
        this.bus = bus;
    }
    LatestCalls.prototype.capitalizeFirstLetter = function (str) {
        if (!str || str.length == 0)
            return '';
        var pieces = str.split(" ");
        for (var i = 0; i < pieces.length; i++) {
            var j = pieces[i].charAt(0).toUpperCase();
            pieces[i] = j + pieces[i].substr(1).toLowerCase();
        }
        return pieces.join(" ");
    };
    return LatestCalls;
})();
exports.LatestCalls = LatestCalls;
var Agency = (function () {
    function Agency() {
    }
    return Agency;
})();
var Device = (function () {
    function Device() {
    }
    return Device;
})();
var Response = (function () {
    function Response() {
    }
    return Response;
})();
var Alert = (function () {
    function Alert() {
    }
    return Alert;
})();
var Message = (function () {
    function Message() {
    }
    return Message;
})();
var AlertResponse = (function () {
    function AlertResponse() {
    }
    return AlertResponse;
})();
//# sourceMappingURL=latest.js.map