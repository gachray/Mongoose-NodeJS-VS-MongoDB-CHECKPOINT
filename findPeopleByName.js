// Import the Person model
const Person = require('./person');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB using Mongoose
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');

    // Define the name to search for
    const nameToSearch = 'Mwangi Kamau';

    // Use Model.find() to search for people by name
    Person.find({ name: nameToSearch })
      .then((people) => {
        console.log(`People found with the name "${nameToSearch}":`, people);
      })
      .catch((err) => {
        console.error('Error finding people:', err);
      })
      .finally(() => {
        // Close the database connection
        mongoose.connection.close();
      });

  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
