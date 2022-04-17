const JourneyDetails = ({ journey }) => {
	return (
		<>
			<div className='row my-2'>
				<div className='col-6'>
					<p className='h3'>Bus</p>
				</div>
				<div className='col-6'>
					<p className='h4 lead'>{journey.bus?.regNo}</p>
				</div>
			</div>
			<div className='row my-2'>
				<div className='col-6'>
					<p className='h3'>Boarding Point</p>
				</div>
				<div className='col-6'>
					<p className='h4 lead'>{journey.route?.from?.name}</p>
				</div>
			</div>
			<div className='row my-2'>
				<div className='col-6'>
					<p className='h3'>Drop-off Point</p>
				</div>
				<div className='col-6'>
					<p className='h4 lead'>{journey.route?.to?.name}</p>
				</div>
			</div>
			<div className='row my-2'>
				<div className='col-6'>
					<p className='h3'>Departure</p>
				</div>
				<div className='col-6'>
					<p className='h4 lead'>
						{new Date(journey.departureTime).toDateString()}{' '}
						{new Date(journey.departureTime).toLocaleTimeString()}
					</p>
				</div>
			</div>
			<div className='row my-2'>
				<div className='col-6'>
					<p className='h3'>Arrival</p>
				</div>
				<div className='col-6'>
					<p className='h4 lead'>
						{new Date(journey.arrivalTime).toDateString()}{' '}
						{new Date(journey.arrivalTime).toLocaleTimeString()}
					</p>
				</div>
			</div>
			<div className='row my-2'>
				<div className='col-6 h3'>Fare</div>
				<div className='col-6 h4 lead'>Ksh {journey.fare} / seat</div>
			</div>
			<hr />
			<div className='d-flex justify-content-center align-items-center align-content-center p-2 my-4 bg-dark seats-available'>
				<p>{journey.availableSeats} seats available</p>
			</div>
		</>
	);
};

export default JourneyDetails;
