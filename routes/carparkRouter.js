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

const createCarpark = (req, res) => {
    carparks = [...carparks, req.body]
	res.json(carparks);
}

// Search params:
// keyword (search through address), carparkType, systemType
const searchCarparks = (req, res) => {
	let query = req.query;
	let results = carparks;

	if (isEmptyObj(query)) {
		results = []; // do some error handling here
	}

	// Filter by keyword first
	if (query.keyword) {
		results = results.filter(cp => {
			return cp.address.toLowerCase().includes(query.keyword.toLowerCase());
		});
	}

	// Filter by carpark type
	if (query.carparkType) {
		results = results.filter(cp => {
			return cp["car_park_type"].toUpperCase() == carparkTypes[query.carparkType];
		});
    }
    
    // Filter by parking system type
	if (query.systemType) {
		results = results.filter(cp => {
			return cp["type_of_parking_system"].toUpperCase() === systemTypes[query.systemType];
		});
	}

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
}

const updateCarparkWithId = (req, res, next) => {
    let carpark = carparks.find(cp => cp["car_park_no"] == req.params.id);

    if (carpark) {
		res.json({...carpark, ...req.body});
    } else {
        res.status(404);
        next();
    }
}

const deleteCarparkWithId = (req, res, next) => {
    let carpark = carparks.find(cp => cp["car_park_no"] == req.params.id);

    if (carpark) {
        carparks = carparks.filter((cp) => { return cp["car_park_no"] !== req.params.id })
        res.json({ message: `Successfully deleted carpark '${req.params.id}'!`})
    } else {
        res.status(404);
        next();
    }
}

router.get("/", getCarparks);
router.post("/", createCarpark);
router.get("/search", searchCarparks);
router.get("/:id", getCarparkById);
router.put("/:id", updateCarparkWithId);
router.delete("/:id", deleteCarparkWithId)

// const getArrayOfTypes = (dataArr, keyName) => {
// 	let typeArr = dataArr.reduce((accArr, curr) => {
// 		let currVal = curr[keyName]; // example carparkObj[car_park_type] = BASEMENT CAR PARK
// 		// console.log(currVal, accArr);
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
