var server = require("./routingserver");
var router = require("./routingrouter");
var handlers = require("./requestHandlers");
var express = require('express');
var app = express();
app.use('/images',express.static(__dirname + '/html/airpodsmaxpreorder/images/airpodsmax'));
var req = {
       "/": handlers.start,
       //"/upload": handlers.upload,
       "/show": handlers.show,
       "/send": handlers.send,
       "/watch": handlers.watch,
       "/delet": handlers.delet,
       "/update": handlers.update
    };
server.start(router.route,req);   // 傳遞route物件