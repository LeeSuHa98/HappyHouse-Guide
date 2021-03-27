const express = require('express');
const app = express();

var test1;

const MongoClient = require('mongoose')

MongoClient.connect("mongodb+srv://admin:emm05235@cluster0.umzeh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        dbName:"sample_analytics" 
    }).then(() => console.log('mongodb connected...')).catch(err => console.log(err))

var Schema = MongoClient.Schema;

//define Schema
var accoundSchema = new Schema({
        id: String, 
        account_id: String, 
        limit: String, 
        prodcts : String}
)


//create model
var datas = MongoClient.model('test', accoundSchema, 'accounts')

// 8. Student 객체를 new 로 생성해서 값을 입력
var newDatas = new datas({id:'Hong Gil Dong', account_id:'서울시 강남구 논현동', limit:"man", prodcts:'22'});

// 9. 데이터 저장
newDatas.save(function(error, data){
    if(error){
        console.log(error);
    }else{
        console.log('Saved!')
    }
});

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
  