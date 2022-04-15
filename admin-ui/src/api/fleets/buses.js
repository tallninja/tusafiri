import axios from 'axios';

const BUSES_URL = 'http://localhost:5004/api/buses';

export const getBuses = async () => {
	const res = await axios.get(BUSES_URL);
	return res;
};

export const deleteBus = async (id) => {
	const res = await axios.delete(`${BUSES_URL}/${id}`);
	return res;
};

export const createBus = async (data) => {
	const res = await axios.post(`${BUSES_URL}/`, data);
	return res;
};

export const getBus = async (id) => {
	const res = await axios.get(`${BUSES_URL}/${id}`);
	return res;
};

export const editBus = async (id, data) => {
	const res = await axios.patch(`${BUSES_URL}/${id}`, data);
	return res;
};
