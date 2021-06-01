const { createLogger, format, transports } = require('winston');
const { combine, label, printf } = format;
const path = require('path');
const mt = require('moment-timezone');


function timeStampFormat() {
  return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ'); // '2018-01-01 12:12:12.500 +0900'
}

const date = mt().tz('Asia/Seoul'); // NOTE: 날짜는 한국 시간으로 하고 싶다.
const myFormat = printf(info => `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`); // NOTE: 로그 형식 설정
const koreaTime = format((info) => { // NOTE: 한국 시간으로 하기 위해.. 설정을 안 할 시 에는 UTC 0이 default다.
  info.timestamp = date.format();
  return info;
});

const httpLogger = createLogger({ // NOTE: http status 로그를 남기기 위함.
  format: combine(
    label({ label: 'http' }),
    koreaTime(),
    myFormat,
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'http.log', dirname: path.join(__dirname, 'logs')})
  ],
});

const httpLogStream = {
  write: (message) => { // NOTE: morgan에서 쓰기 위해 이 형태로 fix 되야함.
    httpLogger.log({
      level: 'info',
      message: message,
    });
  },
};

exports.httpLogStream = httpLogStream;