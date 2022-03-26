import React from 'react';
import { useNavigate } from 'react-router-dom';

import { createJourney } from '../../../api';
import { JourneyForm } from './JourneyForm';

export const CreateJourney = () => {
	const navigate = useNavigate();

	const handleSubmit = async (journeyData) => {
		if (window.confirm('Are you sure you want to add this record ?')) {
			let res = await createJourney(journeyData);
			if (res.status === 200) {
				navigate(-1);
			} else {
				console.log(res.data);
			}
		}
	};

	return <JourneyForm onSubmit={handleSubmit} action='Save' />;
};
