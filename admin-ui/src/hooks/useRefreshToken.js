import { api } from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		const res = await api.get('/api/auth/users/refresh-token', {
			withCredentials: true,
		});

		const { id, email, accessToken } = res.data;

		setAuth((prev) => {
			return { ...prev, user: id, email, accessToken };
		});

		return res.data.accessToken;
	};

	return refresh;
};

export default useRefreshToken;
