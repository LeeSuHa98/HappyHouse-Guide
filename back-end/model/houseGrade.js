const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

// Define Schemes
const houseGradeSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true},
  danjiCode: { type: String, required: true },
  convenience: { type: String, required: true },
  safety: { type: String, required: true },
  medical: { type: String, required: true }
});

// Find All
houseGradeSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find();
};

// Find One by id
houseGradeSchema.statics.findByCode = function (code) {
    return this.findOne({"danjiCode" : code});
  };

// Create Model & Export
module.exports = mongoose.model('houseGrade', houseGradeSchema, 'houseGrade');