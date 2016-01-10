var router = require('koa-router')();
var serve = require('koa-static');
var serveFolder = require('koa-static-folder');
var logger = require('koa-logger');
var koaBody = require('koa-body');
var koa = require('koa.io');
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
var port = 1338;
app.listen(port);
console.log('listening on ' + port);
//# sourceMappingURL=server.js.map