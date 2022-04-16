import { useState } from 'react';

const TicketsForm = ({
	selectedSeats,
	handleSubmit,
	amount,
	auth,
	journey,
}) => {
	const [tickets, setTickets] = useState([]);

	const handleNameChange = (e, seat) => {
		let existingTicket = tickets.find((ticket) => ticket.seat === seat._id);
		let newTicket = {
			seat: seat._id,
			passengerName: e.target.value,
			passengerPhone: existingTicket?.passengerPhone,
			journey: journey._id,
		};
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

	const handlePhoneChange = (e, seat) => {
		let existingTicket = tickets.find((ticket) => ticket.seat === seat._id);
		let newTicket = {
			seat: seat._id,
			passengerName: existingTicket?.passengerName,
			passengerPhone: e.target.value,
			journey: journey._id,
		};
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

	return (
		<form className='form' onSubmit={(e) => handleSubmit(e, tickets)}>
			{selectedSeats.map((seat, idx) => {
				return (
					<div className='row my-2' key={idx}>
						<p className='h5 lead'>Seat #{seat.number}</p>
						<div className='col-md-6'>
							<label htmlFor='nameInput' className='form-label'>
								Name:
							</label>
							<input
								id='nameInput'
								type='text'
								className='form-control'
								placeholder='Passenger Name...'
								onChange={(e) => handleNameChange(e, seat)}
							/>
						</div>
						<div className='col-md-6'>
							<label htmlFor='phoneInput' className='form-label'>
								Phone Number:
							</label>
							<input
								id='phoneInput'
								type='text'
								className='form-control'
								placeholder='+254...'
								onChange={(e) => handlePhoneChange(e, seat)}
							/>
						</div>
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
					className='btn btn-success btn-lg'
					disabled={!(selectedSeats.length && auth.id)}
				>
					Book Seats
				</button>
			</div>
		</form>
	);
};

export default TicketsForm;
