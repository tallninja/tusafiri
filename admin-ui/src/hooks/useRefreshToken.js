import { refreshAccessToken } from '../api';
import useAuth from './useAuth';

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		try {
			const userDeatails = await refreshAccessToken();
			if (userDeatails.systemRole === 'ADMIN') {
				setAuth(userDeatails);
				return userDeatails.accessToken;
			}
			return null;
		} catch (err) {
			console.error(err);
		}
	};

	return refresh;
};

export default useRefreshToken;
