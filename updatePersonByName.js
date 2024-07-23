// Import the Person model
const Person = require('./person');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB using Mongoose
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');

    // Define the name to search for and the age to update
    const personName = 'Wanjiku Mwangi'; // Replace with the actual person name
    const newAge = 20;

    // Use Model.findOneAndUpdate() to search and update the person document
    Person.findOneAndUpdate(
      { name: personName }, // Search criteria
      { age: newAge },      // Update operation
      { new: true }         // Option to return the updated document
    )
      .then((updatedPerson) => {
        if (updatedPerson) {
          console.log('Person updated successfully:', updatedPerson);
        } else {
          console.log(`No person found with the name "${personName}"`);
        }
      })
      .catch((err) => {
        console.error('Error updating person:', err);
      })
      .finally(() => {
        // Close the database connection
        mongoose.connection.close();
      });

  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });