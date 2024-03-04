/*
    Developer Details:
    First Name: Ayala Noa, Last Name: Tzabari, ID: 208050187,
    First Name: Anat, Last Name: Shulman, ID: 209122084
*/

// Custom exception constructor for handling coupon-related errors.
function CouponsException(message, couponId) {
    this.name = 'CouponsException';
    this.message = message || 'Internal error'; // Custom or default error message.
    this.couponId = couponId || null;
    this.stack = new Error().stack;
}

//Inheriting from the built-in Error object to maintain compatibility with error-handling mechanisms.
CouponsException.prototype = Object.create(Error.prototype);
CouponsException.prototype.constructor = CouponsException;

// Exporting the CouponsException constructor to make it available for use in other files.
module.exports = CouponsException;