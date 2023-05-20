const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  messages: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: {
      type: String,
      required: true
    }
  }]
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);