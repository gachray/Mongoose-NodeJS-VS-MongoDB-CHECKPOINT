// Import the Person model
const Person = require('./person');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB using Mongoose
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');

    // Create and save a new person document using async/await
    (async () => {
      try {
        // Create a new person document instance
        const newPerson = new Person({
          name: 'John Gitonga',
          age: 30,
          favoriteFoods: ['Pizza', 'Burger']
        });

        // Save the new person document to the database
        const savedPerson = await newPerson.save();
        console.log('Person saved successfully:', savedPerson);

      } catch (err) {
        console.error('Error saving person:', err);
      } finally {
        // Close the database connection
        mongoose.connection.close();
      }
    })();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });