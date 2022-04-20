import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';

import useBooking from '../hooks/useBooking';
import { useParams } from 'react-router-dom';

import Seats from './Seats';

const Journey = () => {
	const [journey, setJourney] = useState({});
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [tickets, setTickets] = useState([]);
	const [amount, setAmount] = useState(0);
	const navigate = useNavigate();
	const params = useParams();

	const { setBooking } = useBooking();

	useEffect(() => {
		(async () => {
			try {
				const res = await api.get(`/fleets/journeys/${params.id}`);
				setJourney(res.data);
			} catch (err) {
				console.error(err);
			}
		})();
	}, [params]);

	const handleSeatClicked = (selectedSeat) => {
		if (selectedSeats.includes(selectedSeat)) {
			setSelectedSeats((seats) =>
				seats.filter((seat) => seat._id !== selectedSeat._id)
			);
			setAmount(amount - journey.fare);
		} else {
			setSelectedSeats([...selectedSeats, selectedSeat]);
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
		let seats = selectedSeats.map((seat) => seat._id);
		setBooking({ journey: journey._id, seats, tickets });
		navigate('/user/booking');
	};

	return (
		<div className='container'>
			<div className='d-flex flex-wrap justify-content-around align-items-center search-strip p-2 my-2'>
				<div className='d-flex justify-content-evenly align-items-center'>
					<h2>{journey.route?.from?.code}</h2>
					<h4 className='mx-4'>
						<i className='fa fa-long-arrow-right'></i>
					</h4>
					<h2>{journey.route?.to?.code}</h2>
				</div>

				<div className='d-flex justify-content-evenly align-items-center'>
					<h2>{new Date(journey.departureTime).toDateString()}</h2>
				</div>
			</div>
			<div className='row mt-4'>
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
						<Seats
							journey={journey}
							onSeatClicked={handleSeatClicked}
							selectedSeats={selectedSeats}
						/>
					</div>
				</div>
				<div className='card col-md-4'>
					<div className='card-body'>
						<h3 className='card-title'>Tickets</h3>
						<form className='form row' onSubmit={handleSubmit}>
							{selectedSeats.map((seat, idx) => {
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
									disabled={!(selectedSeats.length && true)}
								>
									Book Seats
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Journey;
