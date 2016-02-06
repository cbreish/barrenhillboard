"use strict";
var every = require('schedule').every;
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var moment = require('moment');
var secrets = require('./../secrets');
var fs = require('fs');
var CalendarEvent = (function () {
    function CalendarEvent(title, dateTime) {
        this.title = title;
        this.dateTime = dateTime;
    }
    return CalendarEvent;
})();
var Calendar = (function () {
    function Calendar(bus) {
        var _this = this;
        this.getEvents = function () {
            var instance = _this;
            var cal = google.calendar({ version: 'v3', auth: _this.auth });
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
                }
                else {
                    console.log('Recv gcal data: ' + JSON.stringify(response));
                    instance.events = response.items.map(function (incomingEvent) {
                        var event = new CalendarEvent('', '');
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
        };
        this.updateWidgets = function () {
            console.log('Updating calendar');
            _this.bus.post({
                event: 'widgetUpdate',
                messageType: 'calendar:update',
                messageData: { events: _this.events }
            });
        };
        var instance = this;
        this.auth = getAuth();
        this.getEvents();
        bus.subscribe({ event: 'userConnected' }, instance.updateWidgets);
        every('5m').do(function () {
            instance.getEvents();
        });
        this.bus = bus;
    }
    return Calendar;
})();
exports.Calendar = Calendar;
function getAuth() {
    var clientSecret = secrets.GCalAccount.client_secret;
    var clientId = secrets.GCalAccount.client_id;
    var redirectUrl = secrets.GCalAccount.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
    oauth2Client.credentials = {
        "access_token": secrets.GCalAccount.access_token,
        "refresh_token": secrets.GCalAccount.refresh_token
    };
    return oauth2Client;
}
//# sourceMappingURL=calendar.js.map