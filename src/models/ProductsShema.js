const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  // criar uma collecionation
  category: { type: String, enum: ['woman', 'man', 'kid', 'other'], required: true },
  type: { type: String, required: true },
  size: { type: String, required: true },
  brand: { type: String, required: true },
  date: { type: Date, default: Date.now },
  condition: { type: String, enum: ['excellent', 'very good', 'good', 'satisfactory'], required: true },
  price: { type: Number, required: true },
  photos: { type: [String], required: true },
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  buyer: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Product', productSchema);