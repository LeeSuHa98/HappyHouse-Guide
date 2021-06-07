const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
mongoose.set('useCreateIndex', true)
// Define Schemes
const reviewSchema = new mongoose.Schema({
  danjiCode: { type: String, required: true },
  danjiName: { type: String, required: true },
  userId: { type: String, required: true },
  region: { type: String, required: true },
  typeName: { type: String, required: true },
  houseType: {type: String, required: true},
  monthlyRentCharge: { type: String, required: true },
  adminCharge: { type: String, required: true },
  title: { type: String, required: true },
  merit: { type: String, required: true },
  demerit: { type: String, required: true },
  picture: { type: String},
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


// 최신순 3개
reviewSchema.statics.findOrderOfThree = function (danjiCode) {
  return this.find({"danjiCode" : danjiCode}).sort({writeDate: -1}).limit(3);
};

// 최신순 3개
reviewSchema.statics.findPictures = function (danjiCode) {
  return this.find({ "danjiCode" : danjiCode, 'picture' : { $exists: true, $ne: 0 } });
};


// 최신순 정렬
reviewSchema.statics.findOrderByDate = function (pageNumber) {
  var nPerPage =3;
  return this.find().sort({writeDate: -1}).skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0 )
  .limit( nPerPage );
};
// 별점순 정렬
reviewSchema.statics.findOrderByStar = function (pageNumber) {
  var nPerPage =3;
  return this.find().sort({star: -1}).skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0 )
  .limit( nPerPage );
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
  return this.findOne({"_id" : _id});
};

// Update by id
reviewSchema.statics.updateById = function (_id, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({"_id" : _id}, payload, { new: true });
};

// Delete by id
reviewSchema.statics.deleteById = function (_id) {
  return this.remove({"_id" : _id});
};

// Create Model & Export
module.exports = mongoose.model('Reviews', reviewSchema, 'reviews');