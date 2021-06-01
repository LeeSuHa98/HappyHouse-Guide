const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

// Define Schemes
const houseInfoSchema = new mongoose.Schema({
  sidoCode: { type: String, required: true },
  sidoName: { type: String, required: true },
  sigunguCode: { type: String, required: true },
  sigunguName: { type: String, required: true },
  danjiCode: { type: String, required: true },
  danjiName: { type: String, required: true },
  address: { type: String, required: true },
  competeDate: { type: String, required: true },
  houseHoldNum: { type: String, required: true },
  insttName: { type: String, required: true },
});

// Create new todo document
houseInfoSchema.statics.create = function (payload) {
  // this === Model
  const houseInfo = new this(payload);
  // return Promise
  return houseInfo.save();
};

// Find All
houseInfoSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find();
};


// Update by id
houseInfoSchema.statics.updateById = function (_id, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate(ObjectId(_id), payload, { new: true });
};

// Delete by id
houseInfoSchema.statics.deleteById = function (_id) {
  return this.remove(ObjectId(_id));
};

// Create Model & Export
module.exports = mongoose.model('HouseInfo2', houseInfoSchema, 'houseinfos2');