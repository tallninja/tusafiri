import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createLocation } from '../../../api';
import { LocationForm } from './LocationForm';

export const CreateLocation = () => {
	const navigate = useNavigate();

	const handleSubmit = async (locationData) => {
		if (window.confirm('Are you sure you want to add this record ?')) {
			try {
				const res = await createLocation(locationData);
				toast.success(`${res.data.name} was created.`);
				navigate(-1);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		}
	};

	return <LocationForm onSubmit={handleSubmit} action='Save' />;
};
