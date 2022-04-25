import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import Spinner from './Spinner';

const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { auth, persist } = useAuth();
	const refresh = useRefreshToken();

	useEffect(() => {
		let isMounted = true;

		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (err) {
				console.err(err);
			} finally {
				isMounted && setIsLoading(false);
			}
		};

		!auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

		return () => (isMounted = false);
	}, [auth?.accessToken, persist, refresh]);

	return <>{!persist ? <Outlet /> : isLoading ? <Spinner /> : <Outlet />}</>;
};

export default PersistLogin;
