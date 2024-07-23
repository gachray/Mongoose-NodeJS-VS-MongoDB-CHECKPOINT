// Import the Person model
const Person = require('./person');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB using Mongoose
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');

    // Define the person ID to delete
    const personId = '669f2ad85a1fc5220a294852'; // Replace with the actual person _id

    // Use Model.findByIdAndDelete() to find and delete the person document
    Person.findByIdAndDelete(personId)
      .then((removedPerson) => {
        if (removedPerson) {
          console.log('Person removed successfully:', removedPerson);
        } else {
          console.log(`No person found with _id "${personId}"`);
        }
      })
      .catch((err) => {
        console.error('Error removing person:', err);
      })
      .finally(() => {
        // Close the database connection
        mongoose.connection.close();
      });

  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });