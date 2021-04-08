var router = require('koa-router')();
//var serve = require('koa-static');
//var serveFolder = require('koa-static-folder');
var serve = require('koa-static-resolver');
var logger = require('koa-logger');
var koaBody = require('koa-body');
var Koa = require('koa');
var app = new Koa();

//Setup koa routes
app.use(serve({
    dirs: ["./public"],
    defaultIndex: "index.html",
}));

//Setup koa app
app.use(logger());
app.use(koaBody());
app.use(router.routes());
app.outputErrors = true;


//Setup socket.io
var server = require('http').Server(app.callback());
var io = require('socket.io')(server);

//Setup message bus
class Bus  {
    constructor() {
        this.events = {};
    }

    subscribe(event, func) {
        if (!this.events[event.event]) {
            this.events[event.event] = [];
        }
        this.events[event.event].push(func);
    }

    post(message) {
        if (this.events[message.event]) {
            for (let i=0; i<this.events[message.event].length; i++) {
                this.events[message.event][i](message);
            }
        }
    }
}

const bus = new Bus();
bus.subscribe({ event: 'userConnected' }, function (msg) {
    console.log('User connected');
});
bus.subscribe({ event: 'refreshClients' }, function (msg) {
    console.log('Refreshing clients');
    io.sockets.emit('refreshPage', { refresh: true });
});
bus.subscribe({ event: 'widgetUpdate' }, function (msg) {
    //console.log('Connected: ' + io.of("/").connected.length);
    //console.log('Updating Widget: ' + JSON.stringify(msg));
    io.sockets.emit(msg.messageType, msg.messageData);
});

io.on('connection', function (socket) {
    bus.post({ event: 'userConnected' });
});

//Start server
var port = 1338;
server.listen(port);
console.log('listening on ' + port);


//Setup officer widget
var officersWidget = require('./widgets/officers');
var officers = new officersWidget.OfficerList(bus);

//Setup images widget
var imagesWidget = require('./widgets/images');
var images = new imagesWidget.Images(bus);

//Setup weather widget
var weatherWidget = require('./widgets/weather');
var weather = new weatherWidget.Weather(bus);

//Setup latest calls widget
// var latestWidget = require('./widgets/latest');
// var latest = new latestWidget.LatestCalls(bus);

// //Setup latest calendar widget
var calendarWidget = require('./widgets/calendar');
var calendar = new calendarWidget.Calendar(bus);

setTimeout(function () {
    bus.post({
        event: 'refreshClients'
    });
}, 2000);