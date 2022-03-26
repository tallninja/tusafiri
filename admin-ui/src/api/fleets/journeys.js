import axios from 'axios';

const JOURNEYS_URL = 'http://localhost:5004/api/journeys';

export const getJourneys = async () => {
	const res = await axios.get(JOURNEYS_URL);
	return res;
};

export const deleteJourney = async (id) => {
	const res = await axios.delete(`${JOURNEYS_URL}/delete`, {
		params: { id: id },
	});
	return res;
};

export const createJourney = async (data) => {
	const res = await axios.post(`${JOURNEYS_URL}/new`, data);
	return res;
};

export const getJourney = async (id) => {
	const res = await axios.get(`${JOURNEYS_URL}/${id}`);
	return res;
};

export const editJourney = async (id, data) => {
	const res = await axios.patch(`${JOURNEYS_URL}/edit`, data, {
		params: { id: id },
	});
	return res;
};
