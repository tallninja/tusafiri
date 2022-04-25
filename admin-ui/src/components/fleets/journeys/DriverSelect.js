const DriverSelect = ({ id, handleSelect, defaultValue, drivers }) => {
	return (
		<select
			id={id}
			className='form-select'
			onChange={(e) => handleSelect(e.target.value)}
			value={defaultValue}
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
