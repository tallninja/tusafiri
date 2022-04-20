import axios from 'axios';

const BUSES_URL = 'http://localhost:5004/api/buses';

export const getBuses = async () => {
	try {
		const res = await axios.get(BUSES_URL);
		return res;
	} catch (err) {
		throw err;
	}
};

export const deleteBus = async (id) => {
	try {
		const res = await axios.delete(`${BUSES_URL}/${id}`);
		return res;
	} catch (err) {
		throw err;
	}
};

export const createBus = async (data) => {
	try {
		const res = await axios.post(`${BUSES_URL}/`, data);
		return res;
	} catch (err) {
		throw err;
	}
};

export const getBus = async (id) => {
	try {
		const res = await axios.get(`${BUSES_URL}/${id}`);
		return res;
	} catch (err) {
		throw err;
	}
};

export const editBus = async (id, data) => {
	try {
		const res = await axios.patch(`${BUSES_URL}/${id}`, data);
		return res;
	} catch (err) {
		throw err;
	}
};
