import { api } from '../axios';

const AUTH_URL = 'http://localhost:5000/api/auth/users';

export const signin = async (credentials) => {
	try {
		const res = await api.post(`${AUTH_URL}/signin/admin`, credentials, {
			withCredentials: true,
		});

		return res.data;
	} catch (err) {
		throw err;
	}
};

export const signout = async () => {
	try {
		const res = await api.get(`${AUTH_URL}/signout`, {
			withCredentials: true,
		});

		return res.data;
	} catch (err) {
		throw err;
	}
};

export const refreshAccessToken = async () => {
	try {
		const res = await api.get(`${AUTH_URL}/refresh-token`, {
			withCredentials: true,
		});
		return res.data;
	} catch (err) {
		throw err;
	}
};
