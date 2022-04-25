const LocationSelect = ({ id, handleSelect, defaultValue, locations }) => {
	return (
		<select
			id={id}
			className='form-select'
			onChange={(e) => handleSelect(e.target.value)}
			value={defaultValue}
		>
			<option value=''>Select location...</option>
			{locations?.map((location, idx) => (
				<option key={idx} value={location.code}>
					{location.name}
				</option>
			))}
		</select>
	);
};

export default LocationSelect;
