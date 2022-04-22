import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createFeedback } from '../../api';
import { FeedbackForm } from './FeedbackForm';

export const CreateFeedback = () => {
	const navigate = useNavigate();

	const handleSubmit = async (feedbackData) => {
		if (window.confirm('Are you sure you want to add this record ?')) {
			try {
				await createFeedback(feedbackData);
				toast.success('Feedback was created.');
				navigate(-1);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		}
	};

	return <FeedbackForm onSubmit={handleSubmit} />;
};
