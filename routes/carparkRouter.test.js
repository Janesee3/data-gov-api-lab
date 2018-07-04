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
test("Searching with systemType 'electronic' should return an array carparks with 'electronic' in the type field", async () => {
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

test("Searching with systemType 'electronic' should return an array carparks with 'electronic' in the type field", async () => {
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

test("GET /carparks/:id should return a carpark with that id", async () => {
	const response = await request(app).get("/carparks/B27");
	expect(response.status).toEqual(200);
	expect(response.body["car_park_no"]).toEqual("B27");
});

test("PUT /carparks/:id should take in a valid update body and return the updated carpark", async () => {    
    const MOCK_UPDATE = {
        address: "updated address"
    }
    const UPDATED_CARPARK = {
        car_park_no: "B27",
        address: "updated address",
        x_coord: "39654.1953",
        y_coord: "35145.7266",
        car_park_type: "SURFACE CAR PARK",
        type_of_parking_system: "ELECTRONIC PARKING",
        short_term_parking: "WHOLE DAY",
        free_parking: "SUN & PH FR 7AM-10.30PM",
        night_parking: "YES" 
    }
    const response = await request(app).put("/carparks/B27").send(MOCK_UPDATE);
	expect(response.status).toEqual(200);
	expect(response.body).toMatchObject(UPDATED_CARPARK);
});