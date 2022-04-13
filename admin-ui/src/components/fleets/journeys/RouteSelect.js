import React, { useState, useEffect } from 'react';

import { getRoutes } from '../../../api';

const RouteSelect = ({ id, handleSelect, defaultValue }) => {
	const [routes, setRoutes] = useState();

	useEffect(() => {
		(async () => {
			const res = await getRoutes();
			if (res.status === 200) {
				setRoutes(res.data);
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
