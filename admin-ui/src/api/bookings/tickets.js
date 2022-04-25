import axios from 'axios';

const TICKETS_URL = 'http://localhost:5003/api/tickets';

export const getTickets = async () => {
	try {
		const res = await axios.get(TICKETS_URL);
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const deleteTicket = async (id) => {
	try {
		const res = await axios.delete(`${TICKETS_URL}/${id}`);
		return res.data;
	} catch (err) {
		throw err;
	}
};
