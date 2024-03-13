
const cfg = require('./config/mongo.config.js')
const mongoose = require('mongoose');

mongoose.connect(cfg.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB", err);
});

