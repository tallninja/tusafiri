import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createRoute } from '../../../api';
import { RouteForm } from './RouteForm';

export const CreateRoute = () => {
	const navigate = useNavigate();

	const handleSubmit = async (routeData) => {
		if (window.confirm('Are you sure you want to add this record ?')) {
			try {
				const res = await createRoute(routeData);
				toast.success(`${res.data.name} was added.`);
				navigate(-1);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		}
	};

	return <RouteForm onSubmit={handleSubmit} action='Save' />;
};
