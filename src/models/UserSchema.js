const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  photos: {
     type: String,
     required:false 
    },
  nome: {
    type: String,
    required: true
  },
  dataNascimento: {
    type: Date,
    required: true
  },
  genero: {
    type: String,
    enum: ['F', 'M', 'Outro'],
    required: true
  },
  morada: {
    type: String,
    required: true
  },
  localidade: {
    type: String,
    required: true
  },
  codigoPostal: {
    type: String,
    required: true
  },
  telefone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  preferencias:{
    categorias: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Categoria',
    },
    tamnho: {
      type: [String],
    },
    marca: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Marca',
    },
   
  },
  favoritos:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produto'
  }],
  carrinho: [{
    produto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produto'
    },
    quantidade: {
      type: Number,
      default: 1
    }
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
