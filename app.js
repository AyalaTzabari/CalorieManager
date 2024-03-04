/*
    Developer Details:
    First Name: Ayala Noa, Last Name: Tzabari, ID: 208050187,
    First Name: Anat, Last Name: Shulman, ID: 209122084
*/

//Importing required modules for the Express application.
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const CouponsException = require("./couponsexception");

//MongoDB Atlas connection string.
const mongodbConnectionString = "mongodb+srv://ayalat:At123las%21%40%23@cluster0.wmi36kw.mongodb.net/calories_manager";

//Importing routers for add calorie router.
const addCalorieRouter = require('./routes/addcalories');
//Importing routers for report router.
const reportRouter = require('./routes/report');
//Importing routers for about router.
const aboutRouter = require('./routes/about');

//Creating an instance of the Express application.
const app = express();

//Connecting to MongoDB Atlas.
mongoose.connect(mongodbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        //Mongoose models
        const user = require('./models/user');
        const calories = require('./models/calorie');

        // Middleware to make user and calories models available to all routes.
        app.use((req, res, next) => {
            req.user = user;
            req.calories = calories;
            next();
        });

        // view engine setup
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'pug');

        app.use(logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));

        //Routing for addcalorie endpoint.
        app.use('/addcalories', addCalorieRouter);
        //Routing for report endpoint.
        app.use('/report', reportRouter);
        //Routing for about endpoint.
        app.use('/about', aboutRouter);

        // catch 404 and forward to error handler
        app.use((req, res, next) => {
            next(createError(404, 'Not Found'));
        });

        // error handler
        app.use((err, req, res, next) => {
            if (err instanceof CouponsException) {
                res.status(400).json({ error: err.message, couponId: err.couponId });
            } else {
                // set locals, only providing error in development
                res.locals.message = err.message;
                res.locals.error = req.app.get('env') === 'development' ? err : {};

                // render the error page
                res.status(err.status || 500);
                res.render('error');
            }
        });
    })
    .catch((error) => {
        //If connection to MongoDB Atlas fails, throw a couponsException.
        throw new CouponsException("Error connecting to MongoDB Atlas", null);
    });

module.exports = app;