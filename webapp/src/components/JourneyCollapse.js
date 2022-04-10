import { useState } from 'react';

const JourneyCollapse = ({ journey }) => {
	const [bookedSeats, setBookedSeats] = useState([]);

	const handleSeatClicked = (bookedSeat) => {
		if (bookedSeats.includes(bookedSeat)) {
			setBookedSeats((seats) =>
				seats.filter((seat) => seat._id !== bookedSeat._id)
			);
		} else {
			setBookedSeats([...bookedSeats, bookedSeat]);
		}
	};

	return (
		<tr className='collapse' id={btoa(journey._id).slice(0, -2)}>
			<td colSpan='8'>
				<div className='container row'>
					<div className='card col-md-4'>
						<div className='card-body'>
							<h3 className='card-title'>Details</h3>
							<div className='row my-2'>
								<div className='col-6 h6'>Boarding Point</div>
								<div className='col-6'>{journey.route?.from?.name}</div>
							</div>
							<div className='row my-2'>
								<div className='col-6 h6'>Drop-off Point</div>
								<div className='col-6'>{journey.route?.to?.name}</div>
							</div>
							<div className='row my-2'>
								<div className='col-6 h6'>Departure</div>
								<div className='col-6'>
									{new Date(journey.departureTime).toDateString()}{' '}
									{new Date(journey.departureTime).toLocaleTimeString()}
								</div>
							</div>
							<div className='row my-2'>
								<div className='col-6 h6'>Arrival</div>
								<div className='col-6'>
									{new Date(journey.arrivalTime).toDateString()}{' '}
									{new Date(journey.arrivalTime).toLocaleTimeString()}
								</div>
							</div>
							<div className='row my-2'>
								<div className='col-6 h6'>Fare</div>
								<div className='col-6'>Ksh {journey.fare} / seat</div>
							</div>
							<div className='d-flex justify-content-center align-items-center align-content-center p-2 my-2 seats-available'>
								{journey.availableSeats} seats available
							</div>
						</div>
					</div>
					<div className='card col-md-4'>
						<div className='card-body'>
							<h3 className='card-title'>Seats</h3>
							<div className='row'>
								{journey.bus?.seats?.map((seat, idx) => {
									return (
										<div
											className={`col-3 ${
												journey.bookedSeats?.includes(seat._id) ||
												seat.number === 1 ||
												seat.number === 2
													? 'seat-disabled'
													: ''
											}`}
											key={idx}
											onClick={() => handleSeatClicked(seat)}
										>
											<div
												className={`d-flex justify-content-center align-items-center align-content-center p-2 mb-2 seat ${
													bookedSeats.includes(seat) ? 'booked' : ''
												}`}
											>
												{seat.number}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
					<div className='card col-md-4'>
						<div className='card-body'>
							<h3 className='card-title'>Tickets</h3>
							<form className='form row'>
								{bookedSeats.map((seat, idx) => {
									return (
										<div className='col-12'>
											<label htmlFor='nameInput' className='form-label'>
												Seat #{seat.number}
											</label>
											<input
												type='text'
												className='form-control'
												placeholder='Passenger Name...'
											/>
										</div>
									);
								})}
								<div className='d-flex justify-content-around align-items-center align-content-center my-3'>
									<p className='h4'>Total: </p>
									<p className='h4 lead'>
										Ksh {bookedSeats.length * journey.fare}
									</p>
								</div>
								<div className='d-grid'>
									<button
										type='submit'
										className='btn btn-primary'
										disabled={!(bookedSeats.length && true)}
									>
										Book Seats
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</td>
		</tr>
	);
};

export default JourneyCollapse;
