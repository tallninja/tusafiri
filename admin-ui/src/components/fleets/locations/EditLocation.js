import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getLocation, editLocation } from '../../../api';
import { LocationForm } from './LocationForm';

export const EditLocation = () => {
	const [locationData, setLocationData] = useState({});
	let navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			try {
				const res = await getLocation(id);
				setLocationData(res.data);
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
				Object.keys(data).filter((k) => data[k] !== locationData[k])
			); // get only the updated fields
			try {
				const res = await editLocation(locationData._id, updateData);
				toast.success(`${res.data.name} was updated.`);
				navigate(-1);
			} catch (err) {
				console.error(err?.response?.message);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		}
	};

	return (
		<LocationForm
			onSubmit={handleSubmit}
			initialValues={locationData}
			action='Update'
		/>
	);
};
