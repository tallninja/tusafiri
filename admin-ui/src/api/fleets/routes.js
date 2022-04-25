import axios from 'axios';

const ROUTES_URL = 'http://localhost:5004/api/routes';

export const getRoutes = async () => {
	try {
		const res = await axios.get(ROUTES_URL);
		return res;
	} catch (err) {
		throw err;
	}
};

export const deleteRoute = async (id) => {
	try {
		const res = await axios.delete(`${ROUTES_URL}/${id}`);
		return res;
	} catch (err) {
		throw err;
	}
};

export const createRoute = async (data) => {
	try {
		const res = await axios.post(`${ROUTES_URL}/`, data);
		return res;
	} catch (err) {
		throw err;
	}
};

export const getRoute = async (id) => {
	try {
		const res = await axios.get(`${ROUTES_URL}/${id}`);
		return res;
	} catch (err) {
		throw err;
	}
};

export const editRoute = async (id, data) => {
	try {
		const res = await axios.patch(`${ROUTES_URL}/${id}`, data);
		return res;
	} catch (err) {
		throw err;
	}
};
