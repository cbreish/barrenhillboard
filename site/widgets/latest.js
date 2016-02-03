"use strict";
require('es6-promise').polyfill();
var every = require('schedule').every;
var secrets = require('./../secrets');
var active911 = new (require('active911')).RefreshClient(secrets.Active911Token);
var moment = require('moment');
class Call {
}
class LatestCalls {
    constructor(bus) {
        this.getCalls = () => {
            var instance = this;
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
                        return call;
                    });
                    instance.updateWidgets();
                });
            });
        };
        this.updateWidgets = () => {
            console.log('Updating latest calls');
            this.bus.post({
                event: 'widgetUpdate',
                messageType: 'latest:update',
                messageData: { calls: this.calls }
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
    capitalizeFirstLetter(str) {
        if (!str || str.length == 0)
            return '';
        var pieces = str.split(" ");
        for (var i = 0; i < pieces.length; i++) {
            var j = pieces[i].charAt(0).toUpperCase();
            pieces[i] = j + pieces[i].substr(1).toLowerCase();
        }
        return pieces.join(" ");
    }
}
exports.LatestCalls = LatestCalls;
class Agency {
}
class Device {
}
class Response {
}
class Alert {
}
class Message {
}
class AlertResponse {
}
//# sourceMappingURL=latest.js.map