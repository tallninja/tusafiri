const JourneySelect = ({ htmlId, handleSelect, journeys }) => {
	return (
		<select
			id={htmlId}
			className='form-select'
			onChange={(e) => handleSelect(e.target.value)}
			defaultValue=''
		>
			<option value=''>Select journey...</option>
			{journeys?.map((journey) => (
				<option key={journey._id} value={journey._id}>
					From: {journey.route?.from.code}, To: {journey.route?.to.code}, Date:{' '}
					{new Date(journey.departureTime)
						.toString()
						.split(':')
						.slice(0, -1)
						.join(':')}
				</option>
			))}
		</select>
	);
};

export default JourneySelect;
