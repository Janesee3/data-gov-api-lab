const express = require("express");
const router = express.Router();
const carparks = require("../utils/carpark-data.json"); //Array of carpark objects

// carpark types:
// [ 'BASEMENT CAR PARK',
//   'MULTI-STOREY CAR PARK',
//   'SURFACE CAR PARK',
//   'MECHANISED CAR PARK',
//   'COVERED CAR PARK',
//   'MECHANISED AND SURFACE CAR PARK',
//   'SURFACE/MULTI-STOREY CAR PARK' ]

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

router.get("/", getCarparks);

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

module.exports = router;
