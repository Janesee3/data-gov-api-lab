const express = require("express");
const router = express.Router();
let carparks = require("../utils/carpark-data.json"); //Array of carpark objects
const { carparkTypes, systemTypes } = require("../utils/globals");

// short term parking types:
// [ 'WHOLE DAY', '7AM-7PM', 'NO', '7AM-10.30PM' ]

// free parking types:
// [ 'NO', 'SUN & PH FR 7AM-10.30PM', 'SUN & PH FR 1PM-10.30PM' ]

// night parking types:
// [ 'YES', 'NO' ]

// Sample carpark obj
// {
//     "car_park_no": "ACB",
//     "address": "BLK 270/271 ALBERT CENTRE BASEMENT CAR PARK",
//     "x_coord": "30314.7936",
//     "y_coord": "31490.4942",
//     "car_park_type": "BASEMENT CAR PARK",
//     "type_of_parking_system": "ELECTRONIC PARKING",
//     "short_term_parking": "WHOLE DAY",
//     "free_parking": "NO",
//     "night_parking": "YES"
// }

const getCarparks = (req, res) => {
	res.json(carparks);
};

const createCarpark = (req, res, next) => {
	if (!isCarpark(req.body)) {
		next({
			status: 400,
			msg: "The request body is not a valid carpark object!"
		});
		return;
	}

	if (findCarparkWithId(req.body.car_park_no)) {
		res.status(400);
		next({
			status: 400,
			msg: `There is already a carpark with id ${req.body.car_park_no}!`
		});
		return;
	}

	carparks = [...carparks, req.body];
	res.status(201).json();
};

// Search params:
// keyword (search through address), carparkType, systemType
const searchCarparks = (req, res) => {
	let query = req.query;
	let results = carparks;

	if (isEmptyObj(query)) {
		results = []; // do some error handling here
	}

	results = results
		.filter( // Filter by keyword
			cp =>
				query.keyword
					? cp.address.toLowerCase().includes(query.keyword.toLowerCase())
					: true
		)
		.filter( // Filter by carparkType
			cp =>
				query.carparkType
					? cp["car_park_type"].toUpperCase() == carparkTypes[query.carparkType]
					: true
		)
		.filter( // Filter by systemType
			cp =>
				query.systemType
					? cp["type_of_parking_system"].toUpperCase() ===
					  systemTypes[query.systemType]
					: true
		);

	res.json(results);
};

const getCarparkById = (req, res, next) => {
	let carpark = carparks.find(cp => cp["car_park_no"] == req.params.id);

	if (carpark) {
		res.json(carpark);
	} else {
		res.status(404);
		next();
	}
};

const updateCarparkWithId = (req, res, next) => {
	let carpark = carparks.find(cp => cp["car_park_no"] == req.params.id);

	if (carpark) {
		// dont forget to update the array too!!!!!!!!!
		let newCp = { ...carpark, ...req.body };
		carparks = [...carparks, newCp]; // THIS IS WRONG!!
		res.json(newCp);
	} else {
		res.status(404);
		next();
	}
};

const deleteCarparkWithId = (req, res, next) => {
	let carpark = carparks.find(cp => cp["car_park_no"] == req.params.id);

	if (carpark) {
		carparks = carparks.filter(cp => {
			return cp["car_park_no"] !== req.params.id;
		});
		res.json({ message: `Successfully deleted carpark '${req.params.id}'!` });
	} else {
		res.status(404);
		next();
	}
};

router.get("/", getCarparks);
router.post("/", createCarpark);
router.get("/search", searchCarparks);
router.get("/:id", getCarparkById);
router.put("/:id", updateCarparkWithId);
router.delete("/:id", deleteCarparkWithId);

// **** Utility Methods **** //

// Returns true if the input object is a carpark object
const isCarpark = cp => {
	return (
		cp.car_park_no &&
		cp.address &&
		cp.x_coord &&
		cp.y_coord &&
		cp.car_park_type &&
		cp.type_of_parking_system &&
		cp.short_term_parking &&
		cp.free_parking &&
		cp.night_parking
	);
};

// Does a search through local dataset for carpark with the input id
// returns 'undefined' if no carpark found
const findCarparkWithId = id => {
	return carparks.find(cp => cp["car_park_no"] == id);
};

// const getArrayOfTypes = (dataArr, keyName) => {
// 	let typeArr = dataArr.reduce((accArr, curr) => {
// 		let currVal = curr[keyName]; // example carparkObj[car_park_type] = BASEMENT CAR PARK
// 		if (!accArr.includes(currVal)) {
// 			return [...accArr, currVal];
// 		} else {
// 			return accArr;
// 		}
// 	}, []);
// 	return typeArr;
// };

const isEmptyObj = obj => {
	return Object.keys(obj).length === 0;
};

module.exports = router;
