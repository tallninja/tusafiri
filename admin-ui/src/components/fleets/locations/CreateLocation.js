import React from 'react';
import { useNavigate } from 'react-router-dom';

import { createLocation } from '../../../api';
import { LocationForm } from './LocationForm';

export const CreateLocation = () => {
	const navigate = useNavigate();

	const handleSubmit = async (locationData) => {
		if (window.confirm('Are you sure you want to add this record ?')) {
			let location = await createLocation(locationData);
			if (location._id) {
				navigate(-1);
			}
		}
	};

	return <LocationForm onSubmit={handleSubmit} action='Save' />;
};
