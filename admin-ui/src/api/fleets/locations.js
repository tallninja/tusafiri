import axios from 'axios';

const LOCATIONS_URL = 'http://localhost:5004/api/locations';

export const getLocations = async () => {
	try {
		const res = await axios.get(LOCATIONS_URL);
		return res;
	} catch (err) {
		throw err;
	}
};

export const deleteLocation = async (id) => {
	try {
		const res = await axios.delete(`${LOCATIONS_URL}/${id}`);
		return res;
	} catch (err) {
		throw err;
	}
};

export const createLocation = async (data) => {
	try {
		const res = await axios.post(`${LOCATIONS_URL}/`, data);
		return res;
	} catch (err) {
		throw err;
	}
};

export const getLocation = async (id) => {
	try {
		const res = await axios.get(`${LOCATIONS_URL}/${id}`);
		return res;
	} catch (err) {
		throw err;
	}
};

export const editLocation = async (id, data) => {
	try {
		const res = await axios.patch(`${LOCATIONS_URL}/${id}`, data);
		return res;
	} catch (err) {
		throw err;
	}
};
