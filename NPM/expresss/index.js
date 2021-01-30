let express = require('express');
  //載入express模組
let engine = require('ejs-locals');
  //載入ejs-locals 模組
let app = express();

let Enumerable = require('linq-js');

 
//const oracledb = require('oracledb');
/*
oracledb.getConnection(
  {
    user          : "tkec12",
    password      : "tkecdev99",
    connectString : "Data Source=TKECdev;Persist Security Info=True;User ID=tkec12;Password=tkecdev99;Unicode=True"
  },
  connExecute
);
*/
  // 使用express
app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');
app.use('/images', express.static(__dirname + '/airpodsmaxpreorder/images/airpodsmax'));
app.use('/css', express.static(__dirname + '/airpodsmaxpreorder/css'));
app.use('/js', express.static(__dirname + '/airpodsmaxpreorder/js'));
app.use('/models', express.static(__dirname + '/models'));
var presalsejson = require('./models/PresaleModel.json');


app.get('/', function (req, res) {
    res.render('airpodmax', {'title': '燦坤線上 ｜ AirPods Max 預約'
                            });
})

app.get('/api/ConvertModel', function (req, res) {
    var arr = Enumerable.from(presalsejson)
            .select(x => ({ Model:x.Attributes[0].AttributeValue,
                            Color:x.Attributes[1].AttributeValue,
                            Specification:x.Attributes[2].AttributeValue,
                            ProductId:x.ProductId })).toArray();
    var Models = Enumerable.from(arr)
            .select(x => x.Model).distinct();
    var Modelsdata =  {
      Models: [],
      Colors: [],
      Specifications:[],
      Productids:[]
    }
    Modelsdata.Models = Models
    Models.forEach(function(model){
      Modelsdata.Colors.push(Enumerable.from(arr)
                .where(x => x.Model === model)
                .select(y => y.Color).distinct());
      Modelsdata.Specifications.push(Enumerable.from(arr)
                .where(x => x.Model === model)
                .select(y => y.Specification).distinct());
      Modelsdata.Productids.push(Enumerable.from(arr)
                .where(x => x.Model === model)
                .select(y => ({Model:y.Model,Color:y.Color,Spec:y.Specification,ProductId:y.ProductId})).distinct());
    });
            
   res.send(Modelsdata);
})

app.post('/send', function (req, res) {
  //接收資料
  console.log(req.query)
})
let port = 3000;
  //設定port位置
app.listen(port);
  // 監聽 port