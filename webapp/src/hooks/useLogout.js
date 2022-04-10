import useAuth from './useAuth';
import useApiAuth from './useApiAuth';

const useLogout = () => {
	const { setAuth, setPersist } = useAuth();
	const apiAuth = useApiAuth();

	const logout = async () => {
		try {
			await apiAuth.get('/api/auth/users/signout', { withCredentials: true });
			localStorage.setItem('persist', false);
			setPersist(false);
			setAuth({});
		} catch (err) {
			console.error(err);
		}
	};

	return logout;
};

export default useLogout;
