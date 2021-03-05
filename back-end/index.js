const express = require('express');
const app = express();
  
app.get('/', function (req, res) {
  res.send('Hello World!');
});
  
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  
  console.log('Server is working : PORT - ',port);
});
