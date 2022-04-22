import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createJourney } from '../../../api';
import { JourneyForm } from './JourneyForm';

export const CreateJourney = () => {
	const navigate = useNavigate();

	const handleSubmit = async (journeyData) => {
		if (window.confirm('Are you sure you want to add this record ?')) {
			try {
				await createJourney(journeyData);
				toast.success(`Journey was added.`);
				navigate(-1);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		}
	};

	return <JourneyForm onSubmit={handleSubmit} action='Save' />;
};
