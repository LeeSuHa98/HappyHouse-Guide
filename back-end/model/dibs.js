const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

// Define Schemes
const dibsSchema = new mongoose.Schema({
  _id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  houseId: { type: String, required: true }
});

// Create new todo document
dibsSchema.statics.create = function (payload) {
  // this === Model
  const dibs = new this(payload);
  // return Promise
  return dibs.save();
};

// Find All
dibsSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find();
};

dibsSchema.statics.findByUserId = function (userId) {
    return this.find({"userId" : userId});
};

dibsSchema.statics.findByHouseId = function (houseId) {
    return this.find({"houseId" : houseId});
};

dibsSchema.statics.findByUserIdAndHouseId = function (userId, houseId) {
    return this.find({"userId" : userId, "houseId" : houseId});
};

// Find One by id
dibsSchema.statics.findOneById = function (_id) {
  return this.findOne(ObjectId(_id));
};

// Update by id
dibsSchema.statics.updateById = function (_id, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate(ObjectId(_id), payload, { new: true });
};

// Delete by id
dibsSchema.statics.deleteById = function (_id) {
  return this.remove(ObjectId(_id));
};

// Create Model & Export
module.exports = mongoose.model('Dibs', dibsSchema, 'dibs');