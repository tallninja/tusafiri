import { api, apiAuth } from './api';

export const signup = async (data) => {
	try {
		const res = await api.post('/api/auth/users/signup', data);
		return res;
	} catch (err) {
		throw err;
	}
};

export const signin = async (data) => {
	try {
		const res = await api.post('/api/auth/users/signin', data, {
			withCredentials: true,
		});
		return res;
	} catch (err) {
		throw err;
	}
};

export const getLocations = async () => {
	try {
		const res = await api.get('/fleets/locations');
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const searchJourneys = async (data) => {
	try {
		const res = await api.get('/fleets/journeys/search', { params: data });
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const createBooking = async (data) => {
	try {
		const res = await apiAuth.post('/booking-system/bookings/new', data, {
			withCredentials: true,
		});
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const getInvoice = async (id) => {
	try {
		const res = await apiAuth.get(`/booking-system/invoices/${id}`);
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const deleteInvoice = async (id) => {
	try {
		await apiAuth.delete('/booking-system/invoices/delete', { params: { id } });
	} catch (err) {
		throw err;
	}
};
