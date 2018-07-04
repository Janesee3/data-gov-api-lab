const express = require("express");
const app = express();
const carparkRouter = require("./routes/carparkRouter");

app.use(express.json());
// app.get("/", (req, res, next) => {
// 	console.log("im here");
// 	next();
// });
app.use("/carparks", carparkRouter);

module.exports = app;
