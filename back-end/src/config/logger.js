const { createLogger, format, transports } = require('winston');
const { combine, label, printf } = format;
const {Client} = require('@elastic/elasticsearch')
const path = require('path');
const mt = require('moment-timezone');

const client = new Client({
  node: "http://ec2-18-218-243-159.us-east-2.compute.amazonaws.com:9200/"
});

const date = mt().tz('Asia/Seoul'); // NOTE: 날짜는 한국 시간으로 하고 싶다.
const myFormat = printf(info => `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`); // NOTE: 로그 형식 설정
const koreaTime = format((info) => { // NOTE: 한국 시간으로 하기 위해.. 설정을 안 할 시 에는 UTC 0이 default다.
  info.timestamp = date.format();
  return info;
});

const httpLogStream = {
  write: (message) => { // NOTE: morgan에서 쓰기 위해 이 형태로 fix 되야함.
    client.index({
      index: "http-error-logs",
      body: {
        'address' : message.split(' ')[0],
        'user' : message.split(' ')[1],
        'method' : message.split(' ')[2],
        'url' : message.split(' ')[3],
        'status' : message.split(' ')[4],
        'http-version' : message.split(' ')[5],
        timestamp: new Date()
      }
    });
  },
};

exports.httpLogStream = httpLogStream;