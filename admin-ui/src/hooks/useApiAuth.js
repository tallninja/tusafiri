import { useEffect } from 'react';

import { apiAuth } from '../api/axios';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

const useApiAuth = () => {
	const refresh = useRefreshToken();
	const { auth } = useAuth();

	useEffect(() => {
		const requestIntercept = apiAuth.interceptors.request.use(
			(req) => {
				if (!req.headers['Authorization']) {
					req.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
				}
				return req;
			},
			(err) => Promise.reject(err)
		);

		const responseIntercept = apiAuth.interceptors.response.use(
			(res) => res,
			async (err) => {
				const prevRequest = err?.config;

				if (err?.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true;
					const newAccessToken = await refresh();

					if (newAccessToken) {
						prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
					}
					return apiAuth(prevRequest);
				}

				return Promise.reject(err);
			}
		);

		return () => {
			apiAuth.interceptors.request.eject(requestIntercept);
			apiAuth.interceptors.response.eject(responseIntercept);
		};
	}, [auth, refresh]);

	return apiAuth;
};

export default useApiAuth;
