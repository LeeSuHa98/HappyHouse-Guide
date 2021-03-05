const express = require('express');
const app = express();

var test1;

const MongoClient = require('mongoose')
MongoClient.connect("mongodb+srv://admin:emm05235@cluster0.umzeh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
    { useNewUrlParser: true, useUnifiedTopology: true, dbName:"sample_analytics" }).then(() => console.log('mongodb connected...')).catch(err => console.log(err))

var Schema = MongoClient.Schema;

var accoundSchema = new Schema(
    {id: String, account_id: String, limit: String, prodcts : String}
)

var datas = MongoClient.model('test', accoundSchema, 'accounts')

datas.find(function(error, test){
    console.log('--- Read all ---');
    if(error){
        console.log(error);
    }else{
        console.log(test);
        test1=test
    }
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  
  console.log('Server is working : PORT - ',port);
});


app.get('/', function (req, res) {
    res.send('Hello World!'+test1);
  });
  