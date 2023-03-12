const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema para categoria de cada produto
const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },

});

// schema para marca de cada produto
const marcaSchema = new Schema({
  name: {
    type: String,
    required: true
  },

});


const Category = mongoose.model('Categoria', categorySchema);
const Brand = mongoose.model('Marca', marcaSchema);


module.exports = { Marca, Categoria};