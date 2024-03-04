/*
    Developer Details:
    First Name: Ayala Noa, Last Name: Tzabari, ID: 208050187,
    First Name: Anat, Last Name: Shulman, ID: 209122084
*/

const CouponsException = require('./couponsexception');  // Importing custom exception module

//Test for checking if the provided month is valid (between 1 and 12).
const isValidMonth = (month) => {
    if (isNaN(month))
        throw new CouponsException('Month not provided');
    if (!(month >= 1 && month <= 12)) {
        throw new CouponsException('Invalid month provided');
    }
    return true;
};

//Test for checking if the provided year is valid (not greater than the current year).
function isValidYear(year) {
    const currentYear = new Date().getFullYear();
    if (isNaN(year)){
        throw new CouponsException('Year not provided');
    }
    if (!isNaN(year) && !(year <= currentYear)) {
        throw new CouponsException('Invalid year provided');
    }
    return true;
}

//Test for checking if the provided day is valid for the given month.
const isValidDay = (day, month) => {
    if(isNaN(day))
        throw new CouponsException('Day not provided');
    if (
        !(
            ((month === 2 && day >= 1 && day <= 28) ||
                ([4, 6, 9, 11].includes(month) && day >= 1 && day <= 30) ||
                (day >= 1 && day <= 31))
        )
    ) {
        throw new CouponsException('Invalid day provided');
    }
    return true;
};


//Test for checking if the provided user ID exists in the database.
const isValidUserId = async (user_id, User) => {
    try {
        const user = await User.findOne({ id: user_id });

        if (user === null) {
            throw new CouponsException('Invalid user ID provided');
        }
        return true;
    } catch (error) {
        throw new CouponsException('Error checking user ID: ' + error.message);
    }
};

//Test for checking if the provided category is valid.
const isValidCategory = (category) => {
    const categories = ['breakfast', 'lunch', 'dinner', 'other'];
    if (!categories.includes(category)) {
        throw new CouponsException('Invalid category provided');
    }
    return true;
};

module.exports = {
    isValidMonth,
    isValidYear,
    isValidDay,
    isValidUserId,
    isValidCategory
};