const LocationsSelect = ({
	id,
	placeholder,
	locations,
	handleSelect,
	defaultValue,
}) => {
	return (
		<select
			id={id}
			className='form-select form-select-lg'
			onChange={(e) => handleSelect(e.target.value)}
			value={defaultValue}
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
