import React from 'react';
import { useNavigate } from 'react-router-dom';

import { createRoute } from '../../../api';
import { RouteForm } from './RouteForm';

export const CreateRoute = () => {
	const navigate = useNavigate();

	const handleSubmit = async (routeData) => {
		if (window.confirm('Are you sure you want to add this record ?')) {
			let res = await createRoute(routeData);
			if (res.status === 200) {
				navigate(-1);
			} else {
				console.log(res);
				window.alert(JSON.stringify(res.data));
			}
		}
	};

	return <RouteForm onSubmit={handleSubmit} action='Save' />;
};
