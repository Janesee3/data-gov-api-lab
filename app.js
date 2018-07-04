const express = require("express");
const app = express();
const carparkRouter = require("./routes/carparkRouter");

app.use(express.json());
app.use("/carparks", carparkRouter);

module.exports = app;
