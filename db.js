// Import necessary modules
const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env file

// Get MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
