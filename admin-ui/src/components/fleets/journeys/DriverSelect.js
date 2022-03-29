import React, { useState, useEffect } from 'react';

import { getDrivers } from '../../../api';

const DriverSelect = ({ id, handleSelect, defaultValue }) => {
	const [drivers, setDrivers] = useState();

	useEffect(() => {
		(async () => {
			const res = await getDrivers();
			if (res.status === 200) {
				setDrivers(res.data);
			}
		})();
	}, []);

	return (
		<select
			id={id}
			className='form-select'
			onChange={(e) => handleSelect(e.target.value)}
			defaultValue={defaultValue}
		>
			<option value=''>Select driver...</option>
			{drivers?.map((driver) => (
				<option key={driver._id} value={driver.employeeId}>
					{driver.firstName} {driver.lastName}: {driver.employeeId}
				</option>
			))}
		</select>
	);
};

export default DriverSelect;
