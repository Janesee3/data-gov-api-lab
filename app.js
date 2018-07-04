const express = require("express");
const app = express();
const carparkRouter = require("./routes/carparkRouter");

const carparkErrorHandler = (req, res, next) => {
	if (res.statusCode === 404) {
		res.json({ message: "Cannot find carpark with this id!" });
	}
	next();
};

app.use(express.json());
app.use("/carparks", carparkRouter, carparkErrorHandler);
module.exports = app;
