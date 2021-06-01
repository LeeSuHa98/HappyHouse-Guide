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
  houseType: { type: String, required: true },
  bassRentDeposit: { type: String, required: true },
  bassMonthlyRentCharge: { type: String, required: true },
  bassConversionDeposit: { type: String, required: true },
  suplyPrivateArea: { type: String, required: true },
  suplyCommuseArea: { type: String, required: true },
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

// Find One by id
houseInfoSchema.statics.findOneById = function (_id) {
  return this.findOne(ObjectId(_id));
};

// Find sidoCode
houseInfoSchema.statics.findBySidoCode = function (sidoCode) {
  return this.find({"sidoCode" : sidoCode});
};

houseInfoSchema.statics.findAddress = function () {
  return this.find({},{_id:1 , lat:1, lng:1 , houseHoldNum:1});
};

houseInfoSchema.statics.findTest = function (danjiCode) {
  return this.find({"danjiCode" : danjiCode},{_id:0 ,typeName:1 , suplyCommuseArea:1, suplyPrivateArea:1 , bassRentDeposit:1, bassConversionDeposit:1, bassMonthlyRentCharge:1});
};
// Find sidoCode and sigunguCode
houseInfoSchema.statics.findBySidoCodeAndSigunguCode = function (sidoCode, sigunguCode) {
  return this.find({"sidoCode" : sidoCode, "sigunguCode": sigunguCode});
};

// Find sidoCode and sigunguCode and danjiCode
houseInfoSchema.statics.findBySidoCodeAndSigunguCodeAndDanjiCode = function (sidoCode, sigunguCode, danjiCode) {
  return this.find({"sidoCode" : sidoCode, "sigunguCode": sigunguCode, "danjiCode" : danjiCode});
};
// Find danjiCode
houseInfoSchema.statics.findByDanjiCode = function (danjiCode) {
  return this.findOne({"danjiCode" : danjiCode});
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
module.exports = mongoose.model('HouseInfo', houseInfoSchema, 'houseinfo');