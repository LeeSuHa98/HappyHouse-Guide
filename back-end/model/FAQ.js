const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

// Define Schemes
const FAQSchema = new mongoose.Schema({
  faqId: { type: Number, required: true, unique: true },
  category: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

// Create new todo document
FAQSchema.statics.create = function (payload) {
  // this === Model
  const FAQ = new this(payload);
  // return Promise
  return FAQ.save();
};

// Find All
FAQSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find();
};

// Find One by id
FAQSchema.statics.findOneById = function (_id) {
  return this.findOne({ "faqId" : _id });
};

// Update by id
FAQSchema.statics.updateById = function (_id, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ "faqId" :_id }, payload, { new: true });
};

// Delete by id
FAQSchema.statics.deleteById = function (_id) {
  return this.remove({ "faqId" :_id });
};

// Create Model & Export
module.exports = mongoose.model('FAQ', FAQSchema, 'FAQ');