
var fs = require("fs");
var file = "./test.db"
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('file');

db.serialize(function() {

    

  var sql02 = "SELECT rowid AS id, name,remark FROM table01"; 
  db.each(sql02, function(err, row) {
    console.log(row.id + ": " + row.name);
  });
});



db.close();