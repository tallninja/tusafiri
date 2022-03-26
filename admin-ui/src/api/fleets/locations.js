import axios from 'axios';

const LOCATIONS_URL = 'http://localhost:5004/api/locations';

export const getLocations = async () => {
	const res = await axios.get(LOCATIONS_URL);
	return res.data;
};

export const deleteLocation = async (id) => {
	const res = await axios.delete(`${LOCATIONS_URL}/delete`, {
		params: { id: id },
	});
	return res.data;
};

export const createLocation = async (data) => {
	const res = await axios.post(`${LOCATIONS_URL}/new`, data);
	return res.data;
};

export const getLocation = async (id) => {
	const res = await axios.get(`${LOCATIONS_URL}/${id}`);
	return res.data;
};

export const editLocation = async (id, data) => {
	const res = await axios.patch(`${LOCATIONS_URL}/edit`, data, {
		params: { id: id },
	});
	return res.data;
};
