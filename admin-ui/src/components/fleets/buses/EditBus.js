import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getBus, editBus } from '../../../api';
import { BusForm } from './BusForm';

export const EditBus = () => {
	const [busData, setBusData] = useState({});
	let navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			try {
				const res = await getBus(id);
				setBusData(res.data);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		})();
	}, [id]);

	const handleSubmit = async (data) => {
		if (window.confirm('Are you sure you want to update this record ?')) {
			let updateData = _.pick(
				data,
				Object.keys(data).filter((k) => data[k] !== busData[k])
			); // get only the updated fields
			try {
				const res = await editBus(busData._id, updateData);
				toast.success(`${res.data.regNo} was updated.`);
				navigate(-1);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		}
	};

	return (
		<BusForm onSubmit={handleSubmit} initialValues={busData} action='Update' />
	);
};
