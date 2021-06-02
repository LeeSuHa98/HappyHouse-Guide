const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require("./config/logger")
const helmet = require('helmet');
const app = express();
const fs = require('fs');

//body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

app.use(morgan(":remote-addr :remote-user :method :url :status :http-version", { stream: logger.httpLogStream }));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


var apm = require('elastic-apm-node').start({
  // Override service name from package.json
  // Allowed characters: a-z, A-Z, 0-9, -, _, and space
  serviceName: 'MyApp',

  // Use if APM Server requires a token
  secretToken: '',

  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: 'http://ec2-18-224-43-150.us-east-2.compute.amazonaws.com/:8200'
})

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
