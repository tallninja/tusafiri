import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';
import Spinner from './Spinner';

const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	const { auth, persist } = useAuth();

	useEffect(() => {
		let isMounted = true;

		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (err) {
				console.error(err);
			} finally {
				isMounted && setIsLoading(false);
			}
		};

		!auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

		return () => (isMounted = false);
	}, [auth, persist, refresh]);

	return <>{!persist ? <Outlet /> : isLoading ? <Spinner /> : <Outlet />}</>;
};

export default PersistLogin;
