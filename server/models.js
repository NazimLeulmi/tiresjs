let mongoose = require('mongoose');
let Schema = require('mongoose').Schema;

let User = new mongoose.Schema({
  email: { type: String, minlength: 8, maxlength: 50, required: true },
  token: { type: String, minlength: 96, maxlength: 96 },
  pass: { type: String, required: true },
  active: { type: Boolean, required: true, default: false },
}, { timestamps: true })

// Tire Metric Sizing Schema
let Tire = new mongoose.Schema({
  width: { type: Number, min: 150, max: 350, required: true }, // mm
  percentage: { type: Number, min: 30, max: 99, required: true }, // percentage
  diameter: { type: Number, min: 13, max: 30, required: true }, // inches
  quantity: { type: Number, min: 1, max: 5000, required: true }, // inches
  brand: { type: String, minlength: 3, maxlength: 25 },
  type: { type: String, minlength: 1, maxlength: 2, default: "P" }, // 'P','LT','T','ST'
  condition: {
    type: String, minlength: 3, maxlength: 6,
    default: "USED", required: true
  },
  group_index: { type: Number, min: 1, max: 5000, required: true }, // inches
  group: { type: String, minlength: 5, maxlength: 30 },
}, { timestamps: true })





let UserModel = mongoose.model('User', User);
let TireModel = mongoose.model('Tire', Tire);

module.exports = { UserModel,TireModel };