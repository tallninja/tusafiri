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
			let location = await getLocation(id);
			setLocationData(location);
		})();
	}, [id]);

	const handleSubmit = async (data) => {
		if (window.confirm('Are you sure you want to update this record ?')) {
			let updateData = _.pick(
				data,
				Object.keys(data).filter((k) => data[k] !== locationData[k])
			); // get only the updated fields
			let updatedLocation = await editLocation(locationData._id, updateData);
			if (updatedLocation._id) {
				navigate(-1);
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
