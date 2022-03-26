import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getBus, editBus } from '../../../api';
import { BusForm } from './BusForm';

export const EditBus = () => {
	const [busData, setBusData] = useState({});
	let navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			let res = await getBus(id);
			if (res.status === 200) {
				setBusData(res.data);
			} else {
				console.log(res.data);
			}
		})();
	}, [id]);

	const handleSubmit = async (data) => {
		if (window.confirm('Are you sure you want to update this record ?')) {
			let updateData = _.pick(
				data,
				Object.keys(data).filter((k) => data[k] !== busData[k])
			); // get only the updated fields
			let res = await editBus(busData._id, updateData);
			if (res.status === 200) {
				navigate(-1);
			} else {
				console.log(res.data);
			}
		}
	};

	return (
		<BusForm onSubmit={handleSubmit} initialValues={busData} action='Update' />
	);
};
