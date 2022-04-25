import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createBooking } from '../../api';
import { BookingForm } from './BookingForm';

export const CreateBooking = () => {
	const navigate = useNavigate();

	const handleSubmit = async (bookingData) => {
		if (window.confirm('Are you sure you want to add this record ?')) {
			try {
				await createBooking(bookingData);
				toast.success('Booking was added.');
				navigate(-1);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		}
	};

	return <BookingForm onSubmit={handleSubmit} action='Save' />;
};
