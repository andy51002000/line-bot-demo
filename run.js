





const express = require('express');
const db = require('./db');
const Message = require('./models/Message'); // Assuming you have a Message model defined
const axios = require('axios');
const  cfg = require('./config/line.config.js')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());



// POST route to handle messages from the LINE webhook
app.post('/webhook', async (req, res) => {
  console.log('req:', JSON.stringify(req.body, null, 4));  
  try {
    // Extract user information and message from the request body
    const eventData = req.body.events[0];
    const userId = eventData.source.userId;
    const message = eventData.message.text;

    // Saving a message
    const savedMessage = await Message.saveMessage(userId, message);
    console.log('Message saved:', savedMessage);

    res.sendStatus(200);
  } catch (error) {
    console.error('Error handling message:', error);
    res.sendStatus(500);
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.send('Server is up and running!');
});



// We gonna have this /send API to reply message to line channel
// POST route to handle messages from the LINE webhook
app.post('/send', async (req, res) => {
    
  console.log('req:', JSON.stringify(req.body, null, 4));  
  try {
    // Extract replyToken and replyMessage from the request body
    const { replyToken, replyMessage } = req.body;

    // Call replyToUser function to send a reply
    await replyToUser(replyToken, replyMessage);

    // Send response
    res.sendStatus(200);
  } catch (error) {
    console.error('Error handling message:', error);
    res.sendStatus(500);
  }
});



// Start listening on the specified port
app.listen(PORT, () => {
  console.log();
});



// Function to reply to the user
async function replyToUser(replyToken, replyMessage) {
    console.log(cfg.channelAccessToken)
    
  try {
    await axios.post('https://api.line.me/v2/bot/message/reply', {
      replyToken,
      messages: replyMessage,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + cfg.channelAccessToken, 
      }
    });
    console.log('Reply sent successfully');
  } catch (error) {
    console.error('Error sending reply:', error);
    throw new Error('Error sending reply:', error);
  }
}




