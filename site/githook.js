var http = require('http');
var exec = require('child_process').exec;
http.createServer(function (req, res) {
    console.log('Received message');
    var payload = "";
    req.on("data", function (chunk) {
        payload += chunk;
    });
    req.on('end', function () {
        var repo = JSON.parse(payload).repository.full_name;
        console.log('Received payload for ' + repo);
        if (repo == 'cbreish/barrenhillboard') {
            exec('pm2 pull barrenhillboard', function (error, stdout, stderr) {
                exec('pm2 restart githook');
            });
        }
        console.log('Received payload for ' + JSON.parse(payload).repository.full_name);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('');
    });
}).listen(6000);
//# sourceMappingURL=githook.js.map