import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getRoute, editRoute } from '../../../api';
import { RouteForm } from './RouteForm';

export const EditRoute = () => {
	const [routeData, setRouteData] = useState({});
	let navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			let res = await getRoute(id);
			if (res.status === 200) {
				setRouteData({
					...res.data,
					from: res.data.from.code,
					to: res.data.to.code,
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
				Object.keys(data).filter((k) => data[k] !== routeData[k])
			); // get only the updated fields
			let res = await editRoute(routeData._id, updateData);
			if (res.status === 200) {
				navigate(-1);
			} else {
				console.log(res.data);
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
