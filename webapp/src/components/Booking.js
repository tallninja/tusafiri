import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import useApiAuth from '../hooks/useApiAuth';
import useBooking from '../hooks/useBooking';
import Spinner from './Spinner';

const Booking = () => {
	const navigate = useNavigate();
	const { booking } = useBooking();
	const apiAuth = useApiAuth();

	useEffect(() => {
		console.log(booking);
		if (booking.seats) {
			const makeBooking = async () => {
				try {
					const res = await apiAuth.post('/booking-system/bookings', booking);
					navigate(`/user/invoices/${res.data._id}`);
					toast.success('Booking created successfuly.');
				} catch (err) {
					console.error(err?.response?.data);
					toast.error(err?.response?.data?.message || 'An error occured.');
				}
			};

			(async () => await makeBooking())();
		} else {
			navigate(-1);
		}
	}, [booking, navigate, apiAuth]);

	return <Spinner />;
};

export default Booking;
