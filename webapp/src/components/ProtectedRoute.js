import { Outlet, Navigate, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const ProtectedRoute = () => {
	const location = useLocation();

	const { auth } = useAuth();

	return (
		<>
			{auth?.accessToken ? (
				<Outlet />
			) : (
				<Navigate to='/login' state={{ from: location }} replace />
			)}
		</>
	);
};

export default ProtectedRoute;
