/*
    Developer Details:
    First Name: Ayala Noa, Last Name: Tzabari, ID: 208050187,
    First Name: Anat, Last Name: Shulman, ID: 209122084
*/

const mongoose = require('mongoose');

// Defining a mongoose schema for the 'calories' collection.
const calorieSchema = new mongoose.Schema({
    user_id: { type: Number, required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
}, { collection: 'calories' }); // Specifying the collection name as 'calories' for the schema.

// Creating a mongoose model named 'Calorie' based on the defined schema.
const Calorie = mongoose.model('Calorie', calorieSchema);

// Exporting the Calorie model to make it available for use in other parts of the application.
module.exports = Calorie;