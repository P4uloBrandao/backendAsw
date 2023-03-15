const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const produtosVendidoSchema = new Schema({
  produto: {
    type: Schema.Types.ObjectId,
    ref: 'Produto',
    required: true
  },
  quantidade: {
    type: Number,
    required: true
  },
  preco: {
    type: Number,
    required: true
  },
  dataVenda: {
    type: Date,
    default: Date.now,
    required: true
  },
  comprador: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const ProdutoVendido = mongoose.model('ProdutoVendido', produtosVendidoSchema);

module.exports = ProdutoVendido;
