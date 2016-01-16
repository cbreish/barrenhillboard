var router = require('koa-router')();
var serve = require('koa-static');
var serveFolder = require('koa-static-folder');
var logger = require('koa-logger');
var koaBody = require('koa-body');
var koa = require('koa');
var app = koa();
//Setup koa routes
app.use(serve('./public'));
app.use(serveFolder('./css'));
app.use(serveFolder('./js'));
app.use(serveFolder('./img'));
//Setup koa app
app.use(logger());
app.use(koaBody());
app.use(router.routes());
app.outputErrors = true;
//Setup socket.io
var server = require('http').Server(app.callback());
var io = require('socket.io')(server);
//Setup message bus
var simplebus = require('simplebus');
var bus = simplebus.createBus(1000);
bus.subscribe({ event: 'userConnected' }, function (msg) {
    console.log('User connected');
});
bus.subscribe({ event: 'refreshClients' }, function (msg) {
    console.log('Refreshing clients');
    io.sockets.emit('refreshPage', { refresh: true });
});
bus.subscribe({ event: 'widgetUpdate' }, function (msg) {
    console.log('Connected: ' + io.of("/").connected.length);
    console.log('Updating Widget: ' + JSON.stringify(msg));
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
//# sourceMappingURL=server.js.map