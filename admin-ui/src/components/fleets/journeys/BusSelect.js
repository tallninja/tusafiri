import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { getBuses } from '../../../api';

const BusSelect = ({ id, handleSelect, defaultValue }) => {
	const [buses, setBuses] = useState();

	useEffect(() => {
		(async () => {
			try {
				const res = await getBuses();
				setBuses(res.data);
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
