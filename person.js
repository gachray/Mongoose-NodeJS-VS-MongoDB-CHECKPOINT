// Import necessary modules
const mongoose = require('mongoose');

// Define the Person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true // Removes whitespace from both ends of a string
  },
  age: {
    type: Number,
    min: [0, 'Age must be a positive number'], // Minimum age validation
    max: [120, 'Age must be less than or equal to 120'] // Maximum age validation
  },
  favoriteFoods: {
    type: [String],
    default: [] // Default value is an empty array
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create the Person model from the schema
const Person = mongoose.model('Person', personSchema);

// Export the Person model
module.exports = Person;