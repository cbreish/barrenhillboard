"use strict"
require('es6-promise').polyfill();
var every = require('schedule').every;
var secrets = require('./../secrets');
var active911 = new (require('active911')).RefreshClient(secrets.Active911Token);
var moment = require('moment');

class Call {
    Type: string;
    Time: string;
    Location: string;
}


class LatestCalls {

    private bus: any;
    private calls: Call[];
    private callsCount: number;

    constructor(bus: any) {
        var instance = this;

        this.getCalls();
        bus.subscribe({ event: 'userConnected' }, instance.updateWidgets);

        every('5m').do(function () {
            instance.getCalls();
        });

        this.bus = bus;
    }

    getCalls = () => {
        var instance = this;
        active911.getAlerts().then(function (alerts) {
            Promise.all(alerts.map(function (alert) {
                return active911.getAlert(alert.id);
            }))
                .then(function (alertDetails) {
                    instance.calls = alertDetails.map(function (response: Alert) {
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
    }

    updateWidgets = () => {
        console.log('Updating latest calls');
        this.bus.post({
            event: 'widgetUpdate',
            messageType: 'latest:update',
            messageData: { calls: this.calls }
        });
    }

    capitalizeFirstLetter(str) {
        if (!str || str.length == 0) return '';

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
    id: string;
    uri: string;
}

class Device {
    id: string;
    uri: string;
}

class Response {
    response: string;
    timestamp: string;
    device: Device;
}

class Alert {
    id: string;
    received: string;
    sent: string;
    priority: string;
    description: string;
    details: string;
    external_data: string;
    place: string;
    address: string;
    unit: string;
    cross_street: string;
    city: string;
    state: string;
    latitude: string;
    longitude: string;
    source: string;
    units: string;
    cad_code: string;
    map_code: string;
    agency: Agency;
    pagegroups: any[];
    responses: Response[];
}

class Message {
    alert: Alert;
}

class AlertResponse {
    result: string;
    message: Message;
}