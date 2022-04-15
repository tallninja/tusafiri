import axios from 'axios';

const BOOKING_URL = 'http://localhost:5003/api/bookings';

export const getBookings = async () => {
	const res = await axios.get(BOOKING_URL);
	return res;
};

export const deleteBooking = async (id) => {
	const res = await axios.delete(`${BOOKING_URL}/${id}`);
	return res;
};

export const createBooking = async (data) => {
	const res = await axios.post(`${BOOKING_URL}/`, data);
	return res;
};

export const getBooking = async (id) => {
	const res = await axios.get(`${BOOKING_URL}/${id}`);
	return res;
};
