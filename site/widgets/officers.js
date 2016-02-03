"use strict";
var every = require('schedule').every;
class Officer {
    constructor(name, title) {
        this.name = name;
        this.title = title;
    }
}
class OfficerData {
    constructor(title, people) {
        this.title = title;
        this.people = people;
    }
}
class OfficerList {
    constructor(bus) {
        this.rotateList = () => {
            this.currentList++;
            if (this.currentList >= this.lists.length) {
                this.currentList = 0;
            }
        };
        this.updateWidgets = () => {
            console.log('Updating officers list');
            this.bus.post({
                event: 'widgetUpdate',
                messageType: 'officers:update',
                messageData: this.lists[this.currentList]
            });
        };
        this.currentList = -1;
        this.lists = new Array();
        this.lists.push(new OfficerData('Administrative Officers', [
            { name: "Renard Rose", title: "President" },
            { name: "Ed Swift", title: "Vice President" },
            { name: "Sandy Byerly", title: "Secretary" },
            { name: "Brendan Devlin", title: "Treasurer" }
        ]));
        this.lists.push(new OfficerData('Fire Officers', [
            { name: "Chris Schwartz", title: "Chief" },
            { name: "Renard Rose", title: "Deputy Chief" },
            { name: "Tim Tygh", title: "Assistant Chief" },
            { name: "Scott Yoder", title: "Batallion Chief" },
            { name: "Bucky Swider", title: "Captain" },
            { name: "Jamie Viall", title: "Lieutenant" },
            { name: "Chris Hummel", title: "Lieutenant 1" },
            { name: "Pat Dicicco", title: "Safety Officer" },
            { name: "Mike Gaffney", title: "Chief Engineer" },
            { name: "Scott Rotenbury", title: "Fire Police Captain" }
        ]));
        this.lists.push(new OfficerData('Trustees', [
            { name: "Shel Klein", title: "Chairman" },
            { name: "Jamie Viall", title: "Secretary" },
            { name: "Pat Dicicco", title: "" },
            { name: "Tim Tygh", title: "" },
            { name: "William Keely", title: "" },
            { name: "John Lynch", title: "" },
            { name: "Scott Yoder", title: "" },
        ]));
        var instance = this;
        bus.subscribe({ event: 'userConnected' }, instance.updateWidgets);
        console.log('Setting officer update schedule');
        every('15s').do(function () {
            console.log('Officer update schedule triggered');
            instance.rotateList();
            instance.updateWidgets();
        });
        console.log('Done setting officer update schedule');
        this.bus = bus;
    }
}
exports.OfficerList = OfficerList;
//# sourceMappingURL=officers.js.map