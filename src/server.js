const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/database');
const registerController = require('./controllers/registerUserController');
const loginController = require('./controllers/loginController');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');



require("dotenv").config();

const app = express();

db.on('error', console.error.bind(console, 'Erro de conexão com MongoDB:'));

db.once('open', () => {
  console.log('Conexão bem-sucedida com MongoDB');

  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Routes base:
  app.use('/users', userRoutes);
  app.use('/products', productRoutes);


  // Routes finais
  app.post('/register', registerController.registerUser);
  app.post('/login', loginController.loginUser);

  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
      console.log(`Servidor em execução na porta ${PORT}.`);
  });
});
