const express = require("express");
const router = express.Router();
const carparks = require("../utils/carpark-data.json"); //Array of carpark objects
const carparkTypes = require("../utils/globals").carparkTypes;

let queryParams = {
	carparkType: "car_park_type"
};

// parking system types:
// [ 'ELECTRONIC PARKING', 'COUPON PARKING' ]

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

// Search params:
// keyword (search through address), carpark type, carpark system type, short term parking type,
// free parking type, night parking availability
const searchCarparks = (req, res) => {
	let query = req.query;
	let results = carparks;
	//console.log(query);

	if (isEmptyObj(query)) {
		results = []; // do some error handling here
		//res.json("No search queries");
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
			return cp["car_park_type"] === carparkTypes[query.carparkType];
		});
    }
    
    // Filter by parking system type
	if (query.systemType) {
		results = results.filter(cp => {
			return cp[""] === carparkTypes[query.carparkType];
		});
	}

	// console.log(req.query);
	res.json(results);
};

router.get("/", getCarparks);
router.get("/search", searchCarparks);

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
