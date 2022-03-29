import React from 'react';
import { useNavigate } from 'react-router-dom';

import { createBooking } from '../../api';
import { BookingForm } from './BookingForm';

export const CreateBooking = () => {
	const navigate = useNavigate();

	const handleSubmit = async (bookingData) => {
		if (window.confirm('Are you sure you want to add this record ?')) {
			let res = await createBooking(bookingData);
			if (res.status === 200) {
				navigate(-1);
			} else {
				console.log(res.data);
			}
		}
	};

	return <BookingForm onSubmit={handleSubmit} action='Save' />;
};
