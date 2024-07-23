// Import the Person model
const Person = require('./person');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB using Mongoose
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');

    // Define the food to search for
    const foodToSearch = 'Pizza';

    // Use Model.findOne() to search for a person by favorite food
    Person.findOne({ favoriteFoods: foodToSearch })
      .then((person) => {
        if (person) {
          console.log(`Person found with the favorite food "${foodToSearch}":`, person);
        } else {
          console.log(`No person found with the favorite food "${foodToSearch}"`);
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