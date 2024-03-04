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

//Implement the report route.
router.post('/', async (req, res) => {
  try {
    const {user_id, year, month, day, description, category, amount} = req.body;

    const isValidUser = await validationFunctions.isValidUserId(
        parseInt(user_id),
        req.user
    );
    //Check if the user is valid.
    if (!isValidUser) {
      throw new CouponsException('Invalid user ID provided');
    }
    //Check if the year is valid.
    if (!validationFunctions.isValidYear(year)) {
      throw new CouponsException('Invalid year provided');
    }
    //Check if the month is valid.
    if (!validationFunctions.isValidMonth(month)) {
      throw new CouponsException('Invalid month provided');
    }
    //Check if the day is valid.
    if (!validationFunctions.isValidDay(day, month)) {
      throw new CouponsException('Invalid day provided');
    }
    //Check if the category is valid.
    if (!validationFunctions.isValidCategory(category)) {
      throw new CouponsException('Invalid category provided');
    }

    // Creating a new instance of the Calorie model to represent a calorie entry.
    const calorie = new Calorie({
      user_id,
      year,
      month,
      day,
      description,
      category,
      amount,
    });

    //Save the new calorie consumption to the DB
    await calorie.save();

    // Return status code 200 + Message that indicates the action was made successfully.
    res.status(200).send('Calories consumption item added successfully');
  } catch (error) {
    // Handle other exceptions
    res.status(500).json({error: error.message});
  }
});

// Exporting the 'router' instance to make it accessible for other parts of the application.
module.exports = router;
