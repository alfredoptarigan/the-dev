const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult } = require("express-validator");

const { validationRegister } = require("../../validation/UserValidation");

const User = require("../../models/User");

// @route   POST api/users
// @desc    Register User
// @access  Public

router.post("/", validationRegister, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name, email, password } = req.body;

	try {
		// Check if the users exists
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ errors: [{ msg: "User already exists" }] });
		}
		// Get users gravatar
		const avatar = gravatar.url(email, {
			s: "200",
			r: "pg",
			d: "mm",
		});

		// Create User
		user = new User({
			name,
			email,
			avatar,
			password,
		});

		const salt = await bcrypt.genSalt(10);

		user.password = await bcrypt.hash(password, salt);

		await user.save();

		// Return JWT
		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(
			payload,
			config.get("JWTSecret"),
			{
				expiresIn: "1h",
			},
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
