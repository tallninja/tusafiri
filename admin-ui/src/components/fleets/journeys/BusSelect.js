import React, { useState, useEffect } from 'react';

import { getBuses } from '../../../api';

const BusSelect = ({ id, handleSelect, defaultValue }) => {
	const [buses, setBuses] = useState();

	useEffect(() => {
		(async () => {
			const res = await getBuses();
			if (res.status === 200) {
				setBuses(res.data);
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
			<option value=''>Select bus...</option>
			{buses?.map((bus, idx) => (
				<option key={idx} value={bus.regNo}>
					{bus.regNo}
				</option>
			))}
		</select>
	);
};

export default BusSelect;
