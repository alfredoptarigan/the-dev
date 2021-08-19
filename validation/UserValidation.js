const { check, validationResult } = require("express-validator");

const validationRegister = [
	check("name", "Name is required").not().isEmpty(),
	check("email", "Please include a valid email").isEmail(),
	check(
		"password",
		"Please enter a password with 6 or more characters"
	).isLength({ min: 6 }),
];

const validationLogin = [
	check("email", "Please include a valid email").isEmail(),
	check("password", "Password is required").exists(),
];

module.exports = {
	validationRegister,
	validationLogin,
};
