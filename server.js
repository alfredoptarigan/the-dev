const express = require("express");
const connectDatabase = require("./config/db");

const app = express();

// Connect Database
connectDatabase();

// Init Middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.send("API Running");
});

// Define Route
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
