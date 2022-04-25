import axios from 'axios';

const PAYMENTS_URL = 'http://localhost:5003/api/payments';

export const getPayments = async () => {
	try {
		const res = await axios.get(PAYMENTS_URL);
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const getPayment = async (id) => {
	try {
		const res = await axios.delete(`${PAYMENTS_URL}/${id}`);
		return res.data;
	} catch (err) {
		throw err;
	}
};
