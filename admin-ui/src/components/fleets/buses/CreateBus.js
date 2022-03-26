import React from 'react';
import { useNavigate } from 'react-router-dom';

import { createBus } from '../../../api';
import { BusForm } from './BusForm';

export const CreateBus = () => {
	const navigate = useNavigate();

	const handleSubmit = async (busData) => {
		if (window.confirm('Are you sure you want to add this record ?')) {
			let res = await createBus(busData);
			if (res.status === 200) {
				navigate(-1);
			} else {
				console.log(res);
			}
		}
	};

	return <BusForm onSubmit={handleSubmit} action='Save' />;
};
