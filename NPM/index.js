//透過http模組啟動web server服務
const http = require('http') 
var myLogModule = require('./Log.js')

//module.exports 屬性
var myMEAttributes = require('./Attributes.js')
var emitter = require('events').EventEmitter;
var em = new emitter();
em.addListener('FirstEvent',function(data){
  console.log('First Scriber: '+data);
});
em.on('SecondEvent',function(data){
  console.log('Second Scriber:'+data);
});
const server = http.createServer(function (req, res) {
  if(req.url=='/'){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<html><body>This is Home Page.</body></html>');
    res.end();
}else if(req.url=='/student'){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<html><body>This is student Page.</body></html>');
    res.end();
}else if(req.url=='/admin'){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<html><body>This is admin Page.</body></html>');
    em.emit('FirstEvent',"這是第一個監聽式!");
em.emit('SecondEvent',"這是第二個監聽式!");
    res.end();
}else if(req.url=='/json'){
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ data: require('./json/PresaleModel.json')}));
  res.end();
}else
    res.end('Invalid Request!');
})

//設定服務監聽localhost:3000(127.0.0.1/:3000)
server.listen('3000', function () {  
  console.log('server start on 3000 port')
})




