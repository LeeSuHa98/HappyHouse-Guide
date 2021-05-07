const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

// Define Schemes
const communitySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  groupId: { type: Number, required: true },
  replyOrder: { type: Number, required: true },
  replyStep: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  writeDate: { type: Date, required: true },
  numberOfView: { type: Number, required: true }
});

// Create new todo document
communitySchema.statics.create = function (payload) {
  // this === Model
  const community = new this(payload);
  // return Promise
  return community.save();
};

// Find All
communitySchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find();
};

// Find One by id
communitySchema.statics.findOneById = function (_id) {
  return this.findOne(ObjectId(_id));
};

// Update by id
communitySchema.statics.updateById = function (_id, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate(ObjectId(_id), payload, { new: true });
};

// Delete by id
communitySchema.statics.deleteById = function (_id) {
  return this.remove(ObjectId(_id));
};

// Create Model & Export
module.exports = mongoose.model('Community', communitySchema, 'community');