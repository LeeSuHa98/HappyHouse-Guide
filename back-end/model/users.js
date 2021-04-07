const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

// Define Schemes
const userSchema = new mongoose.Schema({
  _id: { type: String, required: true, unique: true },
  userID: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  name: { type: String, required: true },
  phoneNum: { type: String, required: true }
});

// Create new todo document
userSchema.statics.create = function (payload) {
  // this === Model
  const user = new this(payload);
  // return Promise
  return user.save();
};

// Find All
userSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find();
};

// Find One by id
userSchema.statics.findByUserId = function (userId) {
    return this.findOne({"userId" : userId});
  };

// Update by id
userSchema.statics.updateById = function (_id, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({"userId" : userId}, payload, { new: true });
};

// Delete by id
userSchema.statics.deleteById = function (_id) {
  return this.remove({"userId" : userId});
};

// Create Model & Export
module.exports = mongoose.model('User', userSchema, 'users');