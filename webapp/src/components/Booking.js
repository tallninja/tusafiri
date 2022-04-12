import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { createBooking } from '../api';
import useBooking from '../hooks/useBooking';
import Spinner from './Spinner';

const Booking = () => {
	const navigate = useNavigate();
	const { booking } = useBooking();

	useEffect(() => {
		console.log(booking);
		if (booking.seats) {
			const makeBooking = async () => {
				try {
					const invoice = await createBooking(booking);
					navigate(`/booking/invoice/${invoice._id}`);
				} catch (err) {
					console.error(err);
				}
			};

			makeBooking();
		} else {
			navigate(-1);
		}
	}, [booking, navigate]);

	return <Spinner />;
};

export default Booking;
