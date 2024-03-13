



const express = require('express');
const db = require('./db');
const Message = require('./models/Message'); // Assuming you have a Message model defined
const axios = require('axios');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());



// Health check endpoint
app.get('/health', (req, res) => {
  res.send('Server is up and running!');
});


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



// Start listening on the specified port
app.listen(PORT, () => {
  console.log();
});






