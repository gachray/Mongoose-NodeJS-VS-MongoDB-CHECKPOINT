// Import the Person model
const Person = require('./person');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB using Mongoose
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');

    // Define an array of people with Kenyan names
    const arrayOfPeople = [
      { name: 'Wanjiku Mwangi', age: 25, favoriteFoods: ['Ugali', 'Sukuma Wiki'] },
      { name: 'Mwangi Kamau', age: 30, favoriteFoods: ['Nyama Choma', 'Githeri'] },
      { name: 'Achieng Otieno', age: 22, favoriteFoods: ['Fish', 'Kachumbari'] },
      { name: 'Mutua Ndunda', age: 35, favoriteFoods: ['Mukimo', 'Matoke'] },
      { name: 'Njeri Wanjiru', age: 28, favoriteFoods: ['Chapati', 'Beans'] }
    ];

    // Create and save multiple people using Model.create()
    Person.create(arrayOfPeople)
      .then((people) => {
        console.log('People saved successfully:', people);
      })
      .catch((err) => {
        console.error('Error saving people:', err);
      })
      .finally(() => {
        // Close the database connection
        mongoose.connection.close();
      });

  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
