import React from 'react';
import { useNavigate } from 'react-router-dom';

import { createLocation } from '../../../api';
import { LocationForm } from './LocationForm';

export const CreateLocation = () => {
	const navigate = useNavigate();

	const handleSubmit = async (locationData) => {
		if (window.confirm('Are you sure you want to add this record ?')) {
			let res = await createLocation(locationData);
			if (res.status === 200) {
				navigate(-1);
			} else {
				console.log(res.data);
			}
		}
	};

	return <LocationForm onSubmit={handleSubmit} action='Save' />;
};
