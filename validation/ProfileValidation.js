const { check, validationResult } = require("express-validator");

const createProfileValidation = [
	check("status", "Status is required").not().isEmpty(),
	check("skills", "Skills is required").not().isEmpty(),
];

module.exports = {
	createProfileValidation,
};
