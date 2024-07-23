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
    const personName = 'Mary'; // Replace with the actual name

    // Function to delete documents and use done callback
    const deletePeopleByName = (done) => {
      Person.deleteMany({ name: personName })
        .then((result) => {
          console.log('Documents removed successfully:', result);
          console.log(`Number of documents removed: ${result.deletedCount}`);
          done(); // Indicate completion to done callback
        })
        .catch((err) => {
          console.error('Error removing documents:', err);
          done(err); // Pass error to done callback
        })
        .finally(() => {
          // Close the database connection
          mongoose.connection.close();
        });
    };

    // Call the function and pass the done callback
    deletePeopleByName((err) => {
      if (err) {
        console.error('Error in deletePeopleByName:', err);
      } else {
        console.log('Operation completed successfully.');
      }
    });

  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });