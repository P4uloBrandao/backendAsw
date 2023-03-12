const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {type: Schema.Types.ObjectId,ref: 'Categoria',required: true},
  brand: {type: Schema.Types.ObjectId,ref: 'Marca',required: true},
  type: { type: String, required: true },
  size: { type: String, required: true },
  date: { type: Date, default: Date.now },
  condition: { type: String, enum: ['excellent', 'very good', 'good', 'satisfactory'], required: true },
  price: { type: Number, required: true },
  photos: { type: [String], required: true },
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
 
});

module.exports = mongoose.model('Produto', productSchema);