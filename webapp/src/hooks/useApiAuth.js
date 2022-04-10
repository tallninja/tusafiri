import { useEffect } from 'react';

import { apiAuth } from '../api/api';
import useAuth from '../hooks/useAuth';
import useRefreshToken from './useRefreshToken';

const useApiAuth = () => {
	const refresh = useRefreshToken();
	const { auth } = useAuth();

	useEffect(() => {
		const requestInterceptor = apiAuth.interceptors.request.use(
			(req) => {
				if (!req.headers['Authorization']) {
					req.headers['Authorization'] = `Bearer ${auth.accessToken}`;
				}
				return req;
			},
			(err) => Promise.reject(err)
		);

		const responseInterceptor = apiAuth.interceptors.response.use(
			(res) => res,
			async (err) => {
				const prevReq = err?.config;

				if (err?.response?.status === 403 || !prevReq.sent) {
					prevReq.sent = true;
					const newAccessToken = await refresh();
					prevReq.headers['Authorization'] = `Bearer ${newAccessToken}`;
					return apiAuth(prevReq);
				}

				return Promise.reject(err);
			}
		);

		return () => {
			apiAuth.interceptors.request.eject(requestInterceptor);
			apiAuth.interceptors.response.eject(responseInterceptor);
		};
	}, [auth, refresh]);

	return apiAuth;
};

export default useApiAuth;
