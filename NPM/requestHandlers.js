var querystring = require("querystring");

var fs = require("fs");
const { json } = require("body-parser");
const { callbackify } = require("util");
var file = "./test.db"

var sqlite3 = require('sqlite3').verbose();
var async = require('async');
var apiInform = {
  "updateinform" : {
     "name" : "",
     "phone" : "",
     "id": "",
     "msg": "",
     "canupdate": true
  },
  "watchinform" : {
    "data" : ""
 }
}
function start(response, postData,pathname) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/show" method="post">'+
    '<input type="submit" value="show ps5 page" />'+
    '</form>'+
    '******************************************************************************************'+
    '<form action="/watch" method="post">'+
    '<input type="submit" value="watch" />'+
    '</form>'+
    '******************************************************************************************'+
    '<form action="/delet" method="post">'+
    '<input name="txtdelete" type="text" maxlength="3" id="txtdeleteNum" >'+
    '<input type="submit" value="delete" />'+
    '</form>'+
    '******************************************************************************************'+
    '<form action="/update" method="post">'+
    '<h3>修改姓名</h3>'+
    '<input name="txtupname" type="text"  ><br/>'+
    '<h3>修改電話</h3>'+
    '<input name="txtupphone" type="text"  ><br/>'+
    '<h3>修改ID</h3>'+
    '<input name="txtupnum" type="text"  >'+
    '<input type="submit" value="update" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
    return start
}
/*
function upload(response, postData,pathname) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent the text: "+
  querystring.parse(postData).text);
  response.end();
}
*/
function show(response, postData,pathname) {
    console.log("Request handler 'show' was called.");
    fs.readFile( __dirname + "/html/airpodsmaxpreorder/" + "index.html", 'utf8', function(error, file) {
      if(error) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(error + "\n");
        response.end();
      } else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(file);
        response.end();
      }
    });
    return show
  }

  function send(response, postData,pathname) {
    var caninsert = true
    var errmsg  = ""
    if (querystring.parse(postData).txtName == ''){
      caninsert = false

      errmsg = "name is nothing"
    }
    else if (querystring.parse(postData).txtPhone == ''){
      caninsert = false
  
      errmsg = "phone is nothing"
  
    }else if (querystring.parse(postData).txtPhone.length != 10 || querystring.parse(postData).txtPhone.substring(0, 2) != '09' || querystring.parse(postData).txtPhone.search(/^09[0-9]{8}$/) == -1){
      caninsert = false

      errmsg = "phone is wrong"
      
    }

  if (caninsert){
    var db = new sqlite3.Database('file');
    db.serialize(function() {
      var sql01 = "INSERT INTO table01(name,remark) VALUES (?,?)";
      db.run(sql01,[querystring.parse(postData).txtName,querystring.parse(postData).txtPhone]);
        });
        db.close();
        
  }

        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(caninsert ? 'Request handler send was called.' : errmsg);
        response.end();
        return send
  
  }

  function watch(response, postData,pathname) {
    
    var db = new sqlite3.Database('file');
  
    var sql02 = "SELECT rowid AS id, name,remark FROM table01";
    //執行同步方法
  /*
    function test(callback){
      //callback func處理
      
      db.all(sql02, function (err, rows) {
        if(err){
            console.log(err);
        }else{
            callback(rows);
        }
      });
    }

    function eat(all){
      apiInform.watchinform.data = all
    }
     
    test(eat)
    response.writeHead(200, {"Content-Type": "text/json"});
    response.write(JSON.stringify(apiInform.watchinform));
    response.end();
    
    return JSON.stringify(apiInform.watchinform);
  */
/*
 var informdata =  new  Promise(function (resolve, reject) {
    db.all(sql02, function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
     
    });
    db.close();
  });

  informdata.then(function(value) {
    apiInform.watchinform.data=value
  });
  response.writeHead(200, {"Content-Type": "text/json"});
  response.write(JSON.stringify(apiInform.watchinform));
  response.end();
  return JSON.stringify(apiInform.watchinform);
  */

 async.series(
  {
      A: function (callback) {
        db.all(sql02, function (err, rows) {
             callback(err,rows)
          });
          db.close();
      }
  }, function (err, results) {
      // results是所有的返回值合集，results.A获取的是A的返回值。
      apiInform.watchinform.data  = results.A
      
  }
  
)

response.writeHead(200, {"Content-Type": "text/json"});
response.write(JSON.stringify(apiInform.watchinform));
response.end();
return JSON.stringify(apiInform.watchinform);

}

  
  
  function delet(response, postData,pathname) {
    var candelete = true
    var errmsg  = ""
    if (querystring.parse(postData).txtdelete == ''){
      candelete = false

      errmsg = "num is wrong"
    }
   
    if (candelete){
      var db = new sqlite3.Database('file');
      var sql04 = "delete from table01 where rowid=?";
      db.run(sql04,querystring.parse(postData).txtdelete);
      db.close();
    }
    response.writeHead(200, {"Content-Type": "text/json"});
    response.write(candelete ? "Request handler 'delete' was called." : errmsg);
    response.end();
    return JSON.stringify(candelete ? "Request handler 'delete' was called." : errmsg);
  }

  function update(response, postData,pathname) {


  
    if (querystring.parse(postData).txtupname == ''){
      apiInform.updateinform.canupdate = false
      apiInform.updateinform.msg = "name is nothing"
    }
    else if (querystring.parse(postData).txtupphone == ''){
      apiInform.updateinform.canupdate = false
      apiInform.updateinform.msg  = "phone is nothing"
    }else if (querystring.parse(postData).txtupphone.length != 10 || querystring.parse(postData).txtupphone.substring(0, 2) != '09' || querystring.parse(postData).txtupphone.search(/^09[0-9]{8}$/) == -1){
      apiInform.updateinform.canupdate = false
      apiInform.updateinform.msg  = "phone is wrong"
    }
    if (apiInform.updateinform.canupdate){
      var db = new sqlite3.Database('file');
      var sql05 = "update table01 set name=?,remark=? where rowid=?";
      db.run(sql05,querystring.parse(postData).txtupname,querystring.parse(postData).txtupphone,querystring.parse(postData).txtupnum);
      db.close();
    }
      
    


    response.writeHead(200, {"Content-Type": "text/json"});
    response.write(JSON.stringify(apiInform.updateinform));
    response.end();
    return JSON.stringify(apiInform.updateinform);
  }

  

exports.start = start;
//exports.upload = upload;
exports.show = show;
exports.send = send;
exports.watch = watch;
exports.delet = delet;
exports.update = update;