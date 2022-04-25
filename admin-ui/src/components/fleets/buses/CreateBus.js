import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createBus } from '../../../api';
import { BusForm } from './BusForm';

export const CreateBus = () => {
	const navigate = useNavigate();

	const handleSubmit = async (busData) => {
		if (window.confirm('Are you sure you want to add this record ?')) {
			try {
				const res = await createBus(busData);
				toast.success(`${res.data.regNo} was added.`);
				navigate(-1);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		}
	};

	return <BusForm onSubmit={handleSubmit} action='Save' />;
};
