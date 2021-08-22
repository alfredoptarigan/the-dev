const { check, validationResult } = require("express-validator");

const validationPost = [check("text", "Text is required").not().isEmpty()];

module.exports = {
	validationPost,
};
