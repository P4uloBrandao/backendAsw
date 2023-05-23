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
const ChatRooms=require('./models/ChatRoom')
const asyncHandler = require('express-async-handler')
const User=require('../src/models/UserSchema');
const { off } = require('./models/ProductsShema');

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
  const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:4200',
      methods: ['GET', 'POST'],
      allowedHeaders: ['my-custom-header'],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    socket.on('join', async (data) => {
      socket.join(data.room);
      try {
        const rooms = await ChatRooms.find({ name: data.room });
        let count = 0;
        rooms.forEach((room) => {
          if (room.name === data.room) {
            count++;
          }
        });
        if (count === 0) {
          const chatRoom = new ChatRooms({ name: data.room, messages: [] });
          const newChat = await chatRoom.save();
          console.log('Chat room created');
          console.log(newChat);
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    });
  
    socket.on('message', async (data) => {
      io.in(data.room).emit('new message', { user: data.user, message: data.message });
      try {
        const updatedChatRoom = await ChatRooms.findOneAndUpdate(
          { name: data.room },
          { $push: { messages: { user: data.user, message: data.message } } },
          { new: true }
        );
        console.log('Chat room updated');
      } catch (err) {
        console.log(err);
        return false;
      }
    });
  
    socket.on('typing', (data) => {
      socket.broadcast.in(data.room).emit('typing', { data: data, isTyping: true });
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


  app.get('/chatroom/:room', asyncHandler(async (req, res) => {
    try {
      const { room } = req.params;
      console.log("room")
      console.log(room)

      const chatRoom = await ChatRooms.findOne({ name: room });
      console.log(chatRoom)
      if (chatRoom) {
        console.log(chatRoom.messages);
        res.json(chatRoom.messages);
      } else {
        res.status(400).json("No chat found");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }));
  


  app.get('/chatrooms/user/:userId', asyncHandler(async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      
      if (!user) {
        res.status(400).json("User not found");
        return;
      }
      
      const chatRooms = await ChatRooms.find();
      console.log(chatRooms);
  
      const userRooms = chatRooms.filter(room => room.name.includes(user.email));
      console.log(userRooms)
      const resultUsers = [];
      if(userRooms){
        for (const room of userRooms) {
            const emails = room.name.split(',');
            for (const email of emails) {
              const trimmedEmail = email.trim();
              if (trimmedEmail !== user.email) {
                const otherUser = await User.findOne({ email: trimmedEmail });
                if (otherUser) {
                  resultUsers.push(otherUser);
                }
              }
            }
          }
      
          if (resultUsers.length > 0) {
            res.json(resultUsers);
          } else {
            res.status(400).json("No users found in the chat rooms");
          }
      }else {
        res.status(400).json("No userrooms found");
      }

    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }));
  
  

});
