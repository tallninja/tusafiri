import axios from 'axios';

const USERS_URL = 'http://localhost:5000/api/users';

export const getUsers = async () => {
	try {
		const res = await axios.get(USERS_URL);
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const getUser = async (id) => {
	try {
		const res = await axios.get(`${USERS_URL}/${id}`);
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const editUsers = async (id) => {
	try {
		const res = await axios.get(`${USERS_URL}/${id}`);
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const deleteUser = async (id) => {
	try {
		const res = await axios.get(`${USERS_URL}/${id}`);
		return res.data;
	} catch (err) {
		throw err;
	}
};
