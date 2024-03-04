/*
    Developer Details:
    First Name: Ayala Noa, Last Name: Tzabari, ID: 208050187,
    First Name: Anat, Last Name: Shulman, ID: 209122084
*/

//Importing the express framework and create a route.
var express = require('express');
var router = express.Router();
//Importing the validation function file. So we will be able to use the functions that implemented there.
const validationFunctions = require('../validationfunctions');
//Importing the calorie model.
const Calorie = require('../models/calorie');
// Importing the 'couponsException' module.
const CouponsException = require('../couponsexception');

//Function that will help us to create the report.
const getCaloriesReport = async (year, month, user_id) => {
    try {
        //Checking is the year is valid.
        if (!validationFunctions.isValidYear(year)) {
            throw new CouponsException('Invalid year provided');
        }
        //Checking is the month is valid.
        if (!validationFunctions.isValidMonth(month)) {
            throw new CouponsException('Invalid month provided');
        }

        // Constructing a query object with parsed integer values for user_id, year and month.
        const query = {
            user_id: parseInt(user_id),
            year: parseInt(year),
            month: parseInt(month),
        };

        //In the calorie collection search data by the query object parameters.
        const calories = await Calorie.find(query);

        //Define the categories options.
        const categories = ['breakfast', 'lunch', 'dinner', 'other'];
        //Create empty array object.
        const report = {};

        // Initialize the report object with empty arrays for each category.
        categories.forEach((category) => {
            report[category] = [];
        });

        // Populate the report by pushing each calorie entry into its corresponding category.
        calories.forEach((calorie) => {
            const { day, description, amount } = calorie;
            report[calorie.category].push({ day, description, amount });
        });

        return report;
    } catch (error) {
        throw new CouponsException('Unable to generate report:' + error.message);
    }
};

//Implement the report route.
router.get('/', async (req, res) => {
    try {
        // Extract year, month, and user_id from the query parameters
        const { user_id, year, month } = req.query;

        const isValidUser = await validationFunctions.isValidUserId(
            parseInt(user_id),
            req.user
        );

        //Check if the user is valid.
        if (!isValidUser) {
            throw new CouponsException('Invalid user ID provided');
        }

        // Call the function to generate the report
        const report = await getCaloriesReport(
            year,
            month,
            user_id
        );

        // Return status code 200 + The report as JSON response
        res.status(200).json(report);
    } catch (error) {
        // Send error message to the client
        res.status(500).json({ error: error.message });    }
});

// Exporting the 'router' instance to make it accessible for other parts of the application.
module.exports = router;