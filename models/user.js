/*
    Developer Details:
    First Name: Ayala Noa, Last Name: Tzabari, ID: 208050187,
    First Name: Anat, Last Name: Shulman, ID: 209122084
*/

const mongoose = require('mongoose');

// Defining a mongoose schema for the 'users' collection.
const userSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birthday: { type: String, required: true },
}, { collection: 'users' }); // Specifying the collection name as 'users' for the schema.

// Creating a mongoose model named 'User' based on the defined schema.
const User = mongoose.model('User', userSchema);

// Exporting the User model to make it available for use in other parts of the application.
module.exports = User;