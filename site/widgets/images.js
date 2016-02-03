"use strict";
var every = require('schedule').every;
class Images {
    constructor(bus) {
        this.rotateImage = () => {
            this.currentImage = 'http://barrenhillboard.com/images/image' + this.pad(this.randomNumber(), 3) + '.jpg';
        };
        this.updateWidgets = () => {
            console.log('Updating image');
            this.bus.post({
                event: 'widgetUpdate',
                messageType: 'images:update',
                messageData: { image: this.currentImage }
            });
        };
        this.randomNumber = () => {
            return Math.floor(Math.random() * this.maxImage) + 1;
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
    pad(n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }
}
exports.Images = Images;
//# sourceMappingURL=images.js.map