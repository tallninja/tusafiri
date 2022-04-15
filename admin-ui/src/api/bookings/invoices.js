import axios from 'axios';

const INVOICES_URL = 'http://localhost:5003/api/invoices';

export const getInvoices = async () => {
	const res = await axios.get(INVOICES_URL);
	return res;
};

export const deleteInvoice = async (id) => {
	const res = await axios.delete(`${INVOICES_URL}/${id}`);
	return res;
};

export const createInvoice = async (data) => {
	const res = await axios.post(`${INVOICES_URL}/`, data);
	return res;
};

export const getInvoice = async (id) => {
	const res = await axios.get(`${INVOICES_URL}/${id}`);
	return res;
};
