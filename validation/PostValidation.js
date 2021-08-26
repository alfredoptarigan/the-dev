const { check, validationResult } = require("express-validator");

const validationPost = [check("text", "Text is required").not().isEmpty()];

const checkPost = (post) => {
	if (!post) {
		return res.status(404).json({ msg: "Post not found" });
	}
};

const errObjectId = (err) => {
	if (err === "ObjectId") {
		return res.status(404).json({ msg: "Post not found" });
	}
};

module.exports = {
	validationPost,
	checkPost,
	errObjectId,
};
