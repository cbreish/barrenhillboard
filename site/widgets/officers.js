"use strict";
var schedule = require('node-schedule');
var Officer = (function () {
    function Officer(name, title) {
        this.name = name;
        this.title = title;
    }
    return Officer;
})();
var OfficerData = (function () {
    function OfficerData(title, people) {
        this.title = title;
        this.people = people;
    }
    return OfficerData;
})();
var OfficerList = (function () {
    function OfficerList(bus) {
        var _this = this;
        this.rotateList = function () {
            _this.currentList++;
            if (_this.currentList >= _this.lists.length) {
                _this.currentList = 0;
            }
            console.log('Updating officers list');
            _this.bus.post({
                event: 'widgetUpdate',
                messageType: 'officers:update',
                messageData: _this.lists[_this.currentList]
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
        bus.subscribe({ event: 'userConnected' }, instance.rotateList);
        schedule.scheduleJob('*/1 * * * *', function () {
            instance.rotateList();
        });
        this.bus = bus;
    }
    return OfficerList;
})();
exports.OfficerList = OfficerList;
//# sourceMappingURL=officers.js.map