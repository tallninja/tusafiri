import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useBooking from '../hooks/useBooking';

const JourneyCollapse = ({ journey }) => {
	const [bookedSeats, setBookedSeats] = useState([]);
	const [tickets, setTickets] = useState([]);
	const [amount, setAmount] = useState(bookedSeats.length * journey.fare);
	const navigate = useNavigate();

	const { setBooking } = useBooking();

	const handleSeatClicked = (bookedSeat) => {
		if (bookedSeats.includes(bookedSeat)) {
			setBookedSeats((seats) =>
				seats.filter((seat) => seat._id !== bookedSeat._id)
			);
			setAmount(amount - journey.fare);
		} else {
			setBookedSeats([...bookedSeats, bookedSeat]);
			setAmount(amount + journey.fare);
		}
	};

	const handleChange = (e, seat) => {
		let newTicket = {
			seat: seat._id,
			passengerName: e.target.value,
			journey: journey._id,
		};
		let existingTicket = tickets.find((ticket) => ticket.seat === seat._id);
		if (existingTicket) {
			let updatedTickets = [
				...tickets.filter((ticket) => ticket.seat !== seat._id),
				newTicket,
			];
			setTickets(updatedTickets);
		} else {
			setTickets([...tickets, newTicket]);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let seats = bookedSeats.map((seat) => seat._id);
		setBooking({ journey: journey._id, seats, tickets });
		navigate('/booking');
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
												seat.number === 2 ||
												journey.bookedSeats
													.map((seat) => seat._id)
													.includes(seat._id)
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
							<form className='form row' onSubmit={handleSubmit}>
								{bookedSeats.map((seat, idx) => {
									return (
										<div className='col-12' key={idx}>
											<label htmlFor='nameInput' className='form-label'>
												Seat #{seat.number}
											</label>
											<input
												type='text'
												className='form-control'
												placeholder='Passenger Name...'
												onChange={(e) => handleChange(e, seat)}
											/>
										</div>
									);
								})}
								<div className='d-flex justify-content-around align-items-center align-content-center my-3'>
									<p className='h4'>Total: </p>
									<p className='h4 lead'>Ksh {amount}</p>
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
