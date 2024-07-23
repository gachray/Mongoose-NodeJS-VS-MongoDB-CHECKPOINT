// Import the Person model
const Person = require('./person');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB using Mongoose
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');

    // Define the person ID to search for
    const personId = '60d5f48f9d1d1c001c8b4567'; // Replace with the actual person _id

    // Use Model.findById() to search for a person by _id
    Person.findById(personId)
      .then((person) => {
        if (person) {
          console.log(`Person found with _id "${personId}":`, person);
        } else {
          console.log(`No person found with _id "${personId}"`);
        }
      })
      .catch((err) => {
        console.error('Error finding person:', err);
      })
      .finally(() => {
        // Close the database connection
        mongoose.connection.close();
      });

  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });