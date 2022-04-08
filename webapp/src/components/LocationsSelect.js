import { useState, useEffect } from 'react';

import { getLocations } from '../api';

const LocationsSelect = ({ id, placeholder, handleSelect, defaultValue }) => {
	const [locations, setLocations] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const locations = await getLocations();
				setLocations(locations);
			} catch (err) {
				console.error(err);
			}
		})();
	}, []);

	return (
		<select
			id={id}
			className='form-select form-select-lg'
			onChange={(e) => handleSelect(e.target.value)}
			defaultValue={defaultValue}
		>
			<option value=''>{placeholder}</option>
			{locations?.map((location) => (
				<option key={location._id} value={location.code}>
					{location.name}
				</option>
			))}
		</select>
	);
};

export default LocationsSelect;
