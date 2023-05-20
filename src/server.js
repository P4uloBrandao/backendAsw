const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/database');
const socket = require('socket.io');
const registerController = require('./controllers/registerUserController');
const loginController = require('./controllers/loginController');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes=require('./routes/categoriasRoutes');
const marcaRoutes=require('./routes/marcaRoutes')
const chatRooms=require('./models/ChatRoom')

let messagesArray = [];
let count;

require("dotenv").config();

const app = express();

db.on('error', console.error.bind(console, 'Erro de conexão com MongoDB:'));

db.once('open', () => {
  console.log('Conexão bem-sucedida com MongoDB');

  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());


  const PORT = process.env.PORT || 8080;

  const server=app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}.`);
  });
  //chatRoom

  const io = socket();
  io.attach(server);

  io.sockets.on('connection', (socket) => {
      socket.on('join', (data) => {
          socket.join(data.room);
          chatRooms.find({}).toArray((err, rooms) => {
              if(err){
                  console.log(err);
                  return false;
              }
              count = 0;
              rooms.forEach((room) => {
                  if(room.name == data.room){
                      count++;
                  }
              });
              if(count == 0) {
                  chatRooms.insert({ name: data.room, messages: [] }); 
              }
          });
      });
      socket.on('message', (data) => {
          io.in(data.room).emit('new message', {user: data.user, message: data.message});
          chatRooms.update({name: data.room}, { $push: { messages: { user: data.user, message: data.message } } }, (err, res) => {
              if(err) {
                  console.log(err);
                  return false;
              }
              console.log("Document updated");
          });
      });
      socket.on('typing', (data) => {
          socket.broadcast.in(data.room).emit('typing', {data: data, isTyping: true});
      });
  });

  // Routes base:
  app.use('/users', userRoutes);
 // app.use('/products', productRoutes);
  app.use('/categorias',categoryRoutes);
   // app.use('/products', productRoutes);
  app.use('/marcas',marcaRoutes);

  app.use('/products',productRoutes)
  // Routes finais
  app.post('/register', registerController.registerUser);
  app.post('/login', loginController.loginUser);

  app.get('/chatroom/:room', (req, res, next) => {
    let room = req.params.room;
    chatRooms.find({name: room}).toArray((err, chatroom) => {
        if(err) {
            console.log(err);
            return false;
        }
        res.json(chatroom[0].messages);
    });
  });

});
