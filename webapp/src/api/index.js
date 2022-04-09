import api from './api';

export const getLocations = async () => {
	try {
		const res = await api.get('/fleets/locations');
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const searchJourneys = async (data) => {
	try {
		const res = await api.get('/fleets/journeys/search', { params: data });
		return res.data;
	} catch (err) {
		throw err;
	}
};
