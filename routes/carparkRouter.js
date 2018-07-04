const express = require("express");
const router = express.Router();
const carparkData = require("../utils/carpark-data.json")

const getCarparks = (req, res) => {
	res.json(carparkData);
};

router.get("/", getCarparks);

module.exports = router;