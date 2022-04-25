import { api } from '../api/api';
import useAuth from './useAuth';

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		const res = await api.get('/api/auth/users/refresh-token', {
			withCredentials: true,
		});

		setAuth(res.data);

		return res.data.accessToken;
	};

	return refresh;
};

export default useRefreshToken;
