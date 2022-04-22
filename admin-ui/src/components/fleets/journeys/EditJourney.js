import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getJourney, editJourney } from '../../../api';
import { JourneyForm } from './JourneyForm';

export const EditJourney = () => {
	const [journeyData, setJourneyData] = useState({});
	let navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			try {
				let res = await getJourney(id);
				let drivers = res.data?.drivers?.map((driver) => driver.employeeId);
				setJourneyData({
					...res.data,
					bus: res.data.bus.regNo,
					route: res.data.route.name,
					departureTime: new Date(res.data.departureTime || new Date())
						.toISOString()
						.split(':')
						.slice(0, 2)
						.join(':'),
					arrivalTime: new Date(res.data.arrivalTime || new Date())
						.toISOString()
						.split(':')
						.slice(0, 2)
						.join(':'),
					drivers: drivers,
				});
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
				Object.keys(data).filter((k) => data[k] !== journeyData[k])
			); // get only the updated fields
			try {
				await editJourney(journeyData._id, updateData);
				toast.success('Journey was updated');
				navigate(-1);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
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
