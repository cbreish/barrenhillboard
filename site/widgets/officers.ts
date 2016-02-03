"use strict"

var every = require('schedule').every;

class Officer {
    name: string;
    title: string;

    constructor(name: string, title: string) {
        this.name = name;
        this.title = title;
    }
}

class OfficerData {
    title: string;
    people: Officer[];

    constructor(title: string, people: Officer[]) {
        this.title = title;
        this.people = people;
    }
}

class OfficerList {

    private lists: OfficerData[];
    private currentList: number;
    private bus: any;

    constructor(bus: any) {
        this.currentList = -1;
        this.lists = new Array <OfficerData>();

        this.lists.push(new OfficerData('Administrative Officers',
            [
                { name: "Renard Rose", title: "President" },
                { name: "Ed Swift", title: "Vice President" },
                { name: "Sandy Byerly", title: "Secretary" },
                { name: "Brendan Devlin", title: "Treasurer" }
            ]));

        this.lists.push(new OfficerData('Fire Officers',
            [
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

        this.lists.push(new OfficerData('Trustees',
            [
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

    rotateList = () => {
        this.currentList++;
        if (this.currentList >= this.lists.length) { this.currentList = 0; }
    }

    updateWidgets = () => {
        console.log('Updating officers list');
        this.bus.post({
            event: 'widgetUpdate',
            messageType: 'officers:update',
            messageData: this.lists[this.currentList]
        });
    }
}

exports.OfficerList = OfficerList;