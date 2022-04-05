import axios from '../axios';

const AUTH_URL = 'http://localhost:5000/api/auth/users';

export const signin = async (credentials) => {
	const res = await axios.post(`${AUTH_URL}/signin`, credentials, {
		withCredentials: true,
	});

	return res;
};

export const signout = async () => {
	const res = await axios.get(`${AUTH_URL}/signout`, {
		withCredentials: true,
	});

	return res;
};
