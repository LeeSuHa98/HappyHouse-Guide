const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
mongoose.set('useCreateIndex', true)
// Define Schemes
const reviewSchema = new mongoose.Schema({
  houseId: { type: String, required: true },
  userId: { type: String, required: true },
  region: { type: String, required: true },
  typeName: { type: String, required: true },
  monthlyRentCharge: { type: Number, required: true },
  adminCharge: { type: Number, required: true },
  title: { type: String, required: true },
  merit: { type: String, required: true },
  demerit: { type: String, required: true },
  picture: { data: Buffer},
  writeDate: { type: Date, required: true },
  star: { type: Number, required: true }
});

// Create new todo document
reviewSchema.statics.create = function (payload) {
  // this === Model
  const review = new this(payload);
  // return Promise
  return review.save();
};

// Find All
reviewSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find();
};

reviewSchema.statics.findByUserId = function (userId) {
    return this.find({"userId" : userId});
};

reviewSchema.statics.findByHouseId = function (houseId) {
    return this.find({"houseId" : houseId});
};

reviewSchema.statics.findByUserIdAndHouseId = function (houseId, userId) {
    return this.find({"userId" : userId, "houseId" : houseId});
};

// Find One by id
reviewSchema.statics.findOneById = function (_id) {
  return this.findOne(ObjectId(_id));
};

// Update by id
reviewSchema.statics.updateById = function (_id, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate(ObjectId(_id), payload, { new: true });
};

// Delete by id
reviewSchema.statics.deleteById = function (_id) {
  return this.remove(ObjectId(_id));
};

// Create Model & Export
module.exports = mongoose.model('Reviews', reviewSchema, 'reviews');