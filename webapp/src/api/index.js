import api from './api';

export const getLocations = async () => {
	try {
		const res = await api.get('/fleets/locations');
		return res.data;
	} catch (err) {
		throw err;
	}
};
