import axios from 'axios';

const FEEDBACK_URL = 'http://localhost:5002/api/feedbacks';

export const createFeedback = async (data) => {
	try {
		const res = await axios.post(FEEDBACK_URL, data);
		return res;
	} catch (err) {
		throw err;
	}
};

export const getFeedbacks = async () => {
	try {
		const res = await axios.get(FEEDBACK_URL);
		return res;
	} catch (err) {
		throw err;
	}
};

export const getFeedback = async (id) => {
	try {
		const res = await axios.get(`${FEEDBACK_URL}/${id}`);
		return res;
	} catch (err) {
		throw err;
	}
};

export const deleteFeedback = async (id) => {
	try {
		const res = await axios.delete(`${FEEDBACK_URL}/${id}`);
		return res;
	} catch (err) {
		throw err;
	}
};

export const getFeedbackTypes = async () => {
	try {
		const res = await axios.get(`${FEEDBACK_URL}/types`);
		return res;
	} catch (err) {
		throw err;
	}
};

export const setReviewed = async (id) => {
	try {
		const res = await axios.patch(`${FEEDBACK_URL}/${id}/review`);
		return res;
	} catch (err) {
		throw err;
	}
};
