// Import the Person model
const Person = require('./person');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB using Mongoose
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');

    // Function to find people who like burritos
    const findPeopleWithBurritos = async () => {
      try {
        const data = await Person.find({ favoriteFoods: 'burritos' }) // Find people with 'burritos' in favoriteFoods
          .sort({ name: 1 }) // Sort by name in ascending order
          .limit(2) // Limit to 2 results
          .select('-age') // Exclude the 'age' field
          .exec(); // Execute the query
        
        console.log('Found people:', data);
        return data; // Return the result
      } catch (err) {
        console.error('Error finding people:', err);
        throw err; // Rethrow the error to be caught in the caller
      }
    };

    // Call the function and handle the result
    findPeopleWithBurritos()
      .then((data) => {
        console.log('Operation completed successfully. Data:', data);
      })
      .catch((err) => {
        console.error('Error in findPeopleWithBurritos:', err);
      })
      .finally(() => {
        // Close the database connection
        mongoose.connection.close();
      });

  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });