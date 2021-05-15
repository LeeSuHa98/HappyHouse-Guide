const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const fs = require('fs');
const app = express();

const multer = require('multer');//이렇게하지않으면 filename이 undefined가 나오게됨.
const upload = multer({dest: './upload'})
app.use('/image', express.static('./upload'));

app.post('/api',upload.single('image',(req,res)=>{
  console.log(req.body);
  let image ='/image' +req.file.filename;
  
}));


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

app.get('/', function (req, res) {
    res.send('Hello World!');
  });
