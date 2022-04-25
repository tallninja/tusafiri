import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { getRoutes } from '../../../api';

const RouteSelect = ({ id, handleSelect, defaultValue }) => {
	const [routes, setRoutes] = useState();

	useEffect(() => {
		(async () => {
			try {
				const res = await getRoutes();
				setRoutes(res.data);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		})();
	}, []);

	return (
		<select
			id={id}
			className='form-select'
			onChange={(e) => handleSelect(e.target.value)}
			value={defaultValue}
		>
			<option value=''>Select route...</option>
			{routes?.map((route, idx) => (
				<option key={idx} value={route.name}>
					{route.name}: {route.from?.name} &#8594; {route.to?.name}
				</option>
			))}
		</select>
	);
};

export default RouteSelect;
