import axios from 'axios';

const LOCATIONS_URL = 'http://localhost:5004/api/locations';

export const getLocations = async () => {
	const res = await axios.get(LOCATIONS_URL);
	return res;
};

export const deleteLocation = async (id) => {
	const res = await axios.delete(`${LOCATIONS_URL}/${id}`);
	return res;
};

export const createLocation = async (data) => {
	const res = await axios.post(`${LOCATIONS_URL}/`, data);
	return res;
};

export const getLocation = async (id) => {
	const res = await axios.get(`${LOCATIONS_URL}/${id}`);
	return res;
};

export const editLocation = async (id, data) => {
	const res = await axios.patch(`${LOCATIONS_URL}/${id}`, data);
	return res;
};
