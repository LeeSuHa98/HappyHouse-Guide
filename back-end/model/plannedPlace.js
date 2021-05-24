const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
mongoose.set('useCreateIndex', true)
// Define Schemes
const plannedPlaceSchema = new mongoose.Schema({
  region: { type: String, required: true },
  supply: { type: String, required: true },
  move: { type: String, required: true },
  address: { type: String, required: true }
});

// Create new todo document
plannedPlaceSchema.statics.create = function (payload) {
  // this === Model
  const plannedPlace = new this(payload);
  // return Promise
  return plannedPlace.save();
};

// Find All
plannedPlaceSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find();
};

// Find One by id
plannedPlaceSchema.statics.findOneById = function (_id) {
  return this.findOne(ObjectId(_id));
};


// Create Model & Export
module.exports = mongoose.model('plannedPlace', plannedPlaceSchema, 'plannedPlace');