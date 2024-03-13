

// messageModel.js
const mongoose = require('mongoose');

// Define Message Schema
const messageSchema = new mongoose.Schema({
  userId: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

// Create Message Model
const Message = mongoose.model('Message', messageSchema);

// Function to save a message
Message.saveMessage = async function(userId, messageText) {
  try {
    const message = new Message({
      userId,
      message: messageText
    });
    await message.save();
    return message;
  } catch (error) {
    throw new Error('Error saving message:', error);
  }
};

// Function to query messages by userId
Message.queryByUserId = async function(userId) {
  try {
    const messages = await this.find({ userId });
    return messages;
  } catch (error) {
    throw new Error('Error querying messages:', error);
  }
};

module.exports = Message;




