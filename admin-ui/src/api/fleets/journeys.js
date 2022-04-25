import axios from 'axios';

const JOURNEYS_URL = 'http://localhost:5004/api/journeys';

export const getJourneys = async () => {
	try {
		const res = await axios.get(JOURNEYS_URL);
		return res;
	} catch (err) {
		throw err;
	}
};

export const deleteJourney = async (id) => {
	try {
		const res = await axios.delete(`${JOURNEYS_URL}/${id}`);
		return res;
	} catch (err) {
		throw err;
	}
};

export const createJourney = async (data) => {
	try {
		const res = await axios.post(`${JOURNEYS_URL}/`, data);
		return res;
	} catch (err) {
		throw err;
	}
};

export const getJourney = async (id) => {
	try {
		const res = await axios.get(`${JOURNEYS_URL}/${id}`);
		return res;
	} catch (err) {
		throw err;
	}
};

export const editJourney = async (id, data) => {
	try {
		const res = await axios.patch(`${JOURNEYS_URL}/${id}`, data);
		return res;
	} catch (err) {
		throw err;
	}
};
