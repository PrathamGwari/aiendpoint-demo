const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    match: [/.+@.+\..+/, 'Please enter a valid email address'], // Basic email validation
  },
  password: {
    type: String,
    required: true,
  },
}, { collection: 'users' }); // Specify the collection name if needed

// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;
