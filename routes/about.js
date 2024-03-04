/*
    Developer Details:
    First Name: Ayala Noa, Last Name: Tzabari, ID: 208050187,
    First Name: Anat, Last Name: Shulman, ID: 209122084
*/

//Imorting the express framework and create a route.
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
// Create an array of JSON objects describing the developers of the project.
  const developers = [
    {
      firstname: 'Ayala Noa',
      lastname: 'Tzabari',
      id: '208050187',
      email: 'ayala341@gmail.com',
    },
    {
      firstname: 'Anat',
      lastname: 'Shulman',
      id: '209122084',
      email: 'anat.shulman@gmail.com',
    },
  ];
  res.json(developers);
});

// Exporting the 'router' instance to make it accessible for other parts of the application.
module.exports = router;
