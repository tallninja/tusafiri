import axios from 'axios';

const AUTH_URL = 'http://localhost:5000/api/auth/users';

export const signin = async (credentials) => {
	const res = await axios.post(`${AUTH_URL}/signin`, credentials);
	return res;
};
