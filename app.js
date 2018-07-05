const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-sample.json");
const indexRouter = require("./routes/indexRouter");
const carparkRouter = require("./routes/carparkRouter");

// const carparkErrorHandler = (err, req, res, next) => {
// 	console.log(err.message);
// 	res.json(err.message);
// };

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", indexRouter);
app.use("/carparks", carparkRouter);

app.use((err, req, res, next) => {
	res.status(err.status).json(err.msg);
});

module.exports = app;
