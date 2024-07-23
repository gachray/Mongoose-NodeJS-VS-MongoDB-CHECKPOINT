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
    const personId = '669f2ad85a1fc5220a294853'; // Replace with the actual person _id

    // Use Model.findById() to search for a person by _id
    Person.findById(personId)
      .then((person) => {
        if (person) {
          // Add "hamburger" to the favoriteFoods array
          person.favoriteFoods.push('hamburger');
          
          // Mark the field as modified if necessary (optional, only if `favoriteFoods` is of type Mixed)
          // person.markModified('favoriteFoods');
          
          // Save the updated person document
          return person.save();
        } else {
          console.log(`No person found with _id "${personId}"`);
        }
      })
      .then((updatedPerson) => {
        console.log('Person updated successfully:', updatedPerson);
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
