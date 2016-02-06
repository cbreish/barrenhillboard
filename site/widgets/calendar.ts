"use strict"

var every = require('schedule').every;
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var moment = require('moment');
var secrets = require('./../secrets');
var fs = require('fs');

class CalendarEvent {
    dateTime: string;
    title: string;

    constructor(title: string, dateTime: string) {
        this.title = title;
        this.dateTime = dateTime;
    }

}


class Calendar {

    private bus: any;
    private events: CalendarEvent[];
    private auth: any;

    constructor(bus: any) {
        var instance = this;
        
        this.auth = getAuth();
        this.getEvents();

        bus.subscribe({ event: 'userConnected' }, instance.updateWidgets);

        every('5m').do(function () {
            instance.getEvents();
        });

        this.bus = bus;
    }

    getEvents = () => {
        var instance = this;

        var cal = google.calendar({ version: 'v3', auth: this.auth });
        var query = {
            calendarId: 'bhfc@barrenhill.com',
            timeMin: moment().toISOString(),
            orderBy: 'startTime',
            singleEvents: 'true',
            timeZone: 'America/New_York',
            maxResults: 10
        };
        console.log('Getting gcal data');
        cal.events.list(query, function (err, response) {
            if (err) {
                console.log('Error downloading gcal data: ' + err);
            } else {
                console.log('Recv gcal data: ' + JSON.stringify(response));
                instance.events = response.items.map(function (incomingEvent) {
                    var event = new CalendarEvent('','');
                    var start;
                    if (incomingEvent.start.date) {
                        start = moment(incomingEvent.start.date);
                    }
                    if (incomingEvent.start.dateTime) {
                        start = moment(incomingEvent.start.dateTime);
                    }

                    event.title = incomingEvent.summary;
                    event.dateTime = start;
                    return event;
                });

                instance.updateWidgets();
            }
        });
    }

    updateWidgets = () => {
        console.log('Updating calendar');
        this.bus.post({
            event: 'widgetUpdate',
            messageType: 'calendar:update',
            messageData: { events: this.events}
        });
    }
}

exports.Calendar = Calendar;

function getAuth() {
    var clientSecret = secrets.GCalAccount.client_secret;
    var clientId = secrets.GCalAccount.client_id;
    var redirectUrl = secrets.GCalAccount.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
    oauth2Client.credentials = {
        "refresh_token": secrets.GCalAccount.refresh_token
    };
    return oauth2Client;
}