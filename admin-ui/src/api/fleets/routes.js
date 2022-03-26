import axios from 'axios';

const ROUTES_URL = 'http://localhost:5004/api/routes';

export const getRoutes = async () => {
	const res = await axios.get(ROUTES_URL);
	return res;
};

export const deleteRoute = async (id) => {
	const res = await axios.delete(`${ROUTES_URL}/delete`, {
		params: { id: id },
	});
	return res;
};

export const createRoute = async (data) => {
	const res = await axios.post(`${ROUTES_URL}/new`, data);
	return res;
};

export const getRoute = async (id) => {
	const res = await axios.get(`${ROUTES_URL}/${id}`);
	return res;
};

export const editRoute = async (id, data) => {
	const res = await axios.patch(`${ROUTES_URL}/edit`, data, {
		params: { id: id },
	});
	return res;
};
