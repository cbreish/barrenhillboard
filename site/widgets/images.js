"use strict";
var every = require('schedule').every;
var Images = (function() {
    function Images(bus) {
        var _this = this;
        this.rotateImage = function() {
            _this.currentImage = 'http://barrenhillboard.com/images/' + _this.getNextImage();
        };
        this.updateWidgets = function() {
            console.log('Updating image');
            _this.bus.post({
                event: 'widgetUpdate',
                messageType: 'images:update',
                messageData: { image: _this.currentImage }
            });
        };
        this.getNextImage = function() {
            _this.specialShowing = !_this.specialShowing;
            if (_this.specialShowing) {
                return 'image_special_' + _this.pad(_this.randomNumber(_this.maxSpecialImage), 3) + '.jpg';
            } else {
                return 'image' + _this.pad(_this.randomNumber(_this.maxImage), 3) + '.jpg';
            }
        };
        this.randomNumber = function(max) {
            return Math.floor(Math.random() * max) + 1;
        };
        this.specialShowing = false;
        this.maxImage = 56;
        this.maxSpecialImage = 5;
        var instance = this;
        instance.rotateImage();
        bus.subscribe({ event: 'userConnected' }, instance.updateWidgets);
        every('30s').do(function() {
            instance.rotateImage();
            instance.updateWidgets();
        });
        this.bus = bus;
    }
    Images.prototype.pad = function(n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    };
    return Images;
})();
exports.Images = Images;
//# sourceMappingURL=images.js.map