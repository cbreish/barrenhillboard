"use strict";
var every = require('schedule').every;
var Images = (function () {
    function Images(bus) {
        var _this = this;
        this.rotateImage = function () {
            _this.currentImage = 'http://barrenhillboard.com/images/image' + _this.pad(_this.randomNumber(), 3) + '.jpg';
        };
        this.updateWidgets = function () {
            console.log('Updating image');
            _this.bus.post({
                event: 'widgetUpdate',
                messageType: 'images:update',
                messageData: { image: _this.currentImage }
            });
        };
        this.randomNumber = function () {
            return Math.floor(Math.random() * _this.maxImage) + 1;
        };
        this.maxImage = 95;
        var instance = this;
        instance.rotateImage();
        bus.subscribe({ event: 'userConnected' }, instance.updateWidgets);
        every('30s').do(function () {
            instance.rotateImage();
            instance.updateWidgets();
        });
        this.bus = bus;
    }
    Images.prototype.pad = function (n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    };
    return Images;
})();
var create = function(bus) {
	var widget = new Images(bus);
}
module.exports = create;