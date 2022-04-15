import axios from 'axios';

const EMPLOYEES_URL = 'http://localhost:5005/api/employees';

export const getEmployees = async () => {
	const res = await axios.get(EMPLOYEES_URL);
	return res;
};

export const deleteEmployee = async (id) => {
	const res = await axios.delete(`${EMPLOYEES_URL}/${id}`);
	return res;
};

export const createEmployee = async (data) => {
	const res = await axios.post(`${EMPLOYEES_URL}/`, data);
	return res;
};

export const getEmployee = async (id) => {
	const res = await axios.get(`${EMPLOYEES_URL}/${id}`);
	return res;
};

export const editEmployee = async (id, data) => {
	const res = await axios.patch(`${EMPLOYEES_URL}/${id}`, data);
	return res;
};

export const getDrivers = async () => {
	const res = await axios.get(`${EMPLOYEES_URL}/drivers`);
	return res;
};

export const getFleetManagers = async () => {
	const res = await axios.get(`${EMPLOYEES_URL}/fleet-managers`);
	return res;
};

export const getSnmManagers = async () => {
	const res = await axios.get(`${EMPLOYEES_URL}/snm-managers`);
	return res;
};

export const getHelpDesk = async () => {
	const res = await axios.get(`${EMPLOYEES_URL}/help-desk`);
	return res;
};
