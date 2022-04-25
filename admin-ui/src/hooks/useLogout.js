import useApiAuth from './useApiAuth';
import useAuth from './useAuth';

const useLogout = () => {
	const apiAuth = useApiAuth();
	const { setAuth } = useAuth();

	const logout = async () => {
		await apiAuth.get('/api/auth/users/signout', { withCredentials: true });
		setAuth({});
	};

	return logout;
};

export default useLogout;
