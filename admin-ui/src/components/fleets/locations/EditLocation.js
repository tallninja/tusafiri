import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getLocation, editLocation } from '../../../api';
import { LocationForm } from './LocationForm';

export const EditLocation = () => {
	const [locationData, setLocationData] = useState({});
	let navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			let res = await getLocation(id);
			if (res.status === 200) {
				setLocationData(res.data);
			} else {
				console.log(res.data);
			}
		})();
	}, [id]);

	const handleSubmit = async (data) => {
		if (window.confirm('Are you sure you want to update this record ?')) {
			let updateData = _.pick(
				data,
				Object.keys(data).filter((k) => data[k] !== locationData[k])
			); // get only the updated fields
			let res = await editLocation(locationData._id, updateData);
			if (res.status === 200) {
				navigate(-1);
			} else {
				console.log(res.data);
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
