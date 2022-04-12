import { api } from '../axios';

const AUTH_URL = 'http://localhost:5000/api/auth/users';

export const signin = async (credentials) => {
	const res = await api.post(`${AUTH_URL}/signin`, credentials, {
		withCredentials: true,
	});

	return res;
};

export const signout = async () => {
	const res = await api.get(`${AUTH_URL}/signout`, {
		withCredentials: true,
	});

	return res;
};
