import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getRoute, editRoute } from '../../../api';
import { RouteForm } from './RouteForm';

export const EditRoute = () => {
	const [routeData, setRouteData] = useState({});
	let navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			try {
				const res = await getRoute(id);
				setRouteData({
					...res.data,
					from: res.data.from.code,
					to: res.data.to.code,
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
				Object.keys(data).filter((k) => data[k] !== routeData[k])
			); // get only the updated fields
			try {
				const res = await editRoute(routeData._id, updateData);
				toast.success(`${res.data.name} was updated.`);
				navigate(-1);
			} catch (err) {
				console.error(err?.response?.message);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		}
	};

	return (
		<RouteForm
			onSubmit={handleSubmit}
			initialValues={routeData}
			action='Update'
		/>
	);
};
