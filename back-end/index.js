const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const fs = require('fs');
const app = express();

//body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger({
    format: 'dev',
    stream: fs.createWriteStream('app.log', {'flags': 'w'})
  }));
app.use(helmet());

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
app.use('/Image', express.static('uploads'));   //정적파일제공  app.use('/static', express.stati
app.get('/', function (req, res) {
    res.send('Hello World!');
  });
