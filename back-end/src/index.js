const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require("./config/logger")
const helmet = require('helmet');
const app = express();
const fs = require('fs');

morgan.token('id', function getId(req) { return req.id })


//body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

app.use(morgan(":remote-addr :remote-user :method :url :status :http-version", { stream: logger.httpLogStream }));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//connerct db
const MongoClient = require('mongoose');

MongoClient.connect("mongodb+srv://admin:emm05235@cluster0.umzeh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
    { useNewUrlParser: true, useFindAndModify: false , useUnifiedTopology: true, dbName:"HappyHouse" }).then(() => console.log('mongodb connected...')).catch(err => console.log(err))


var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  
  console.log('Server is working : PORT - ',port);
});

app.use('/happyhouse', require('./router/router'))
app.use('/Image', express.static('uploads'));   //정적파일제공  app.use('/static', express.static(__dirname + '/public'));  <-절대경로
app.get('/', function (req, res) {
    res.send('Hello World!');
  });