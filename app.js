const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-sample.json');
const indexRouter = require("./routes/indexRouter");
const carparkRouter = require("./routes/carparkRouter");


const carparkErrorHandler = (req, res, next) => {
	if (res.statusCode === 404) {
		res.json({ message: "Cannot find carpark with this id!" });
	}
	next();
};

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", indexRouter);
app.use("/carparks", carparkRouter, carparkErrorHandler);
module.exports = app;
