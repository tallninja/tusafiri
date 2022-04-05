import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		const res = await axios.get('/api/auth/users/refresh-token', {
			withCredentials: true,
		});

		setAuth((prev) => {
			return { ...prev, accessToken: res.data.accessToken };
		});

		return res.data.accessToken;
	};

	return refresh;
};

export default useRefreshToken;
