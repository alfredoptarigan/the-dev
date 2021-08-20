const { check, validationResult } = require("express-validator");

const createProfileValidation = [
	check("status", "Status is required").not().isEmpty(),
	check("skills", "Skills is required").not().isEmpty(),
];

const experienceProfileValidation = [
	check("title", "Title is required").not().isEmpty(),
	check("company", "Title is required").not().isEmpty(),
	check("company", "Title is required").not().isEmpty(),
	check("from", "From date is required").not().isEmpty(),
];

module.exports = {
	createProfileValidation,
	experienceProfileValidation,
};
