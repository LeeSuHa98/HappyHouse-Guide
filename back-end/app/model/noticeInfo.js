const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
// Define Schemes
const noticeInfoSchema = new mongoose.Schema({
  PAN_SS: { type: String, required: true },
  DTL_URL: { type: String, required: true },
  PAN_NM: { type: Number, required: true }
});

// Create new todo document
noticeInfoSchema.statics.create = function (payload) {
  // this === Model
  const noticeInfo = new this(payload);
  // return Promise
  return noticeInfo.save();
};

// Find All
noticeInfoSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find();
};

// Find One by id
noticeInfoSchema.statics.findOneById = function (_id) {
  return this.findOne(ObjectId(_id));
};


// Create Model & Export
module.exports = mongoose.model('noticeInfo', noticeInfoSchema, 'noticeInfo');