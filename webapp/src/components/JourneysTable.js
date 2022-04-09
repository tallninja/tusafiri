const JourneysTable = ({ journeys }) => {
	return (
		<div className='table-responsive-sm my-4'>
			<table className='table table-hover table-lg'>
				<thead>
					<tr>
						<th scope='col'>#</th>
						<th scope='col'>Bus</th>
						<th scope='col'>From</th>
						<th scope='col'>To</th>
						<th scope='col'>Fare</th>
						<th scope='col'>Available Seats</th>
						<th scope='col'>Departure Time</th>
						<th scope='col'>Arrival Time</th>
					</tr>
				</thead>
				<tbody>
					{journeys.map((journey, idx) => {
						return (
							<tr key={journey._id} onClick={() => console.log(journey._id)}>
								<td>{idx + 1}</td>
								<td>{journey.bus?.regNo || '-'}</td>
								<td>{journey.route?.from?.name || '-'}</td>
								<td>{journey.route?.to?.name || '-'}</td>
								<td>Ksh {journey.fare}</td>
								<td>
									{journey.availableSeats} / {journey.bus?.capacity}
								</td>
								<td>
									{journey.departureTime
										? new Date(journey.departureTime).toLocaleTimeString()
										: '-'}
								</td>
								<td>
									{journey.arrivalTime
										? new Date(journey.arrivalTime).toLocaleTimeString()
										: '-'}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default JourneysTable;
