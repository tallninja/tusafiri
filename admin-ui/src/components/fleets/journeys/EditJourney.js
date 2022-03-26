import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getJourney, editJourney } from '../../../api';
import { JourneyForm } from './JourneyForm';

export const EditJourney = () => {
	const [journeyData, setJourneyData] = useState({});
	let navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			let res = await getJourney(id);
			if (res.status === 200) {
				setJourneyData({
					...res.data,
					bus: res.data.bus.regNo,
					route: res.data.route.name,
					departureTime: new Date(res.data.departureTime)
						.toISOString()
						.split(':')
						.slice(0, 2)
						.join(':'),
					arrivalTime: new Date(res.data.arrivalTime)
						.toISOString()
						.split(':')
						.slice(0, 2)
						.join(':'),
				});
			} else {
				console.log(res.data);
			}
		})();
	}, [id]);

	const handleSubmit = async (data) => {
		if (window.confirm('Are you sure you want to update this record ?')) {
			let updateData = _.pick(
				data,
				Object.keys(data).filter((k) => data[k] !== journeyData[k])
			); // get only the updated fields
			let res = await editJourney(journeyData._id, updateData);
			if (res.status === 200) {
				navigate(-1);
			} else {
				console.log(res.data);
			}
		}
	};

	return (
		<JourneyForm
			onSubmit={handleSubmit}
			initialValues={journeyData}
			action='Update'
		/>
	);
};