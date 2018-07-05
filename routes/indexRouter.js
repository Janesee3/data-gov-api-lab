const express = require("express");
const router = express.Router();

const homeRoute = (req, res) => {
	res.json("Hello!");
};

router.get("/", homeRoute);

module.exports = router;
