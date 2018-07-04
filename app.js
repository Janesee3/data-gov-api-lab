const express = require("express");
const app = express();
const carparkData = require("./utils/carpark-data.json");

app.use(express.json());

app.get("/", (req, res) => {
    res.json(carparkData);
});

module.exports = app;
