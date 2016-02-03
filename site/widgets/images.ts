"use strict"

var every = require('schedule').every;

class Images {

    private maxImage: number;
    private currentImage: string;
    private bus: any;

    constructor(bus: any) {
        this.maxImage = 95;

        var instance = this;
        instance.rotateImage();

        bus.subscribe({ event: 'userConnected' }, instance.updateWidgets);

        every('30s').do( function () {
            instance.rotateImage();
            instance.updateWidgets();
        });

        this.bus = bus;
    }

    rotateImage = () => {
        this.currentImage = 'http://barrenhillboard.com/images/image' + this.pad(this.randomNumber(), 3) + '.jpg';
    }

    updateWidgets = () => {
        console.log('Updating image');
        this.bus.post({
            event: 'widgetUpdate',
            messageType: 'images:update',
            messageData: { image: this.currentImage }
        });
    }

    randomNumber = () => {
        return Math.floor(Math.random() * this.maxImage) + 1  
    }

    pad(n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }
}

exports.Images = Images;