const request = require("supertest");
const app = require("../app");
const { carparkTypes, systemTypes } = require("../utils/globals");
const queryParams = require("../routes/carparkRouter").queryParams;

test("GET /carparks should return an array (of carparks)", async () => {
	const response = await request(app).get("/carparks");
	expect(response.status).toEqual(200);
	expect(Array.isArray(response.body)).toEqual(true);
});

test("GET /carparks/search with no query should return an empty array", async () => {
	const response = await request(app).get("/carparks/search");
	expect(response.status).toEqual(200);
	expect(Array.isArray(response.body)).toEqual(true);
	expect(response.body.length === 0).toEqual(true);
});

// GET /carparks/search?keyword=yishun
test("Searching with keyword 'yishun' should return an array of carparks with 'yishun' in the address field", async () => {
	const response = await request(app).get("/carparks/search?keyword=yishun");
	expect(response.status).toEqual(200);
	expect(Array.isArray(response.body)).toEqual(true);
	response.body.forEach(cp => {
		let address = cp.address.toLowerCase();
		expect(address.includes("yishun")).toEqual(true);
	});
});

// GET /carparks/search?carparkType=basement
test("Searching with carparkType 'basement' should return an array carparks with 'basement' in the type field", async () => {
	const response = await request(app).get(
		"/carparks/search?carparkType=basement"
	);
	expect(response.status).toEqual(200);
	expect(Array.isArray(response.body)).toEqual(true);
	response.body.forEach(cp => {
		let carparkType = cp["car_park_type"];
		expect(carparkType).toEqual(carparkTypes.BASEMENT);
	});
});

// GET /carparks/search?systemType=electronic
test.only("Searching with systemType 'electronic' should return an array carparks with 'electronic' in the type field", async () => {
	const response = await request(app).get(
		"/carparks/search?systemType=electronic"
	);
	expect(response.status).toEqual(200);
	expect(Array.isArray(response.body)).toEqual(true);
	response.body.forEach(cp => {
		let systemType = cp["type_of_parking_system"];
		expect(systemType).toEqual(systemTypes.ELECTRONIC);
	});
});
