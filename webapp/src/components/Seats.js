import { useEffect, useState } from 'react';

import { api } from '../api/api';

import Spinner from './Spinner';

const Seats = ({ journey, onSeatClicked, selectedSeats }) => {
	const [seats, setSeats] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [bookedSeats, setBookedSeats] = useState([]);

	useEffect(() => {
		if (journey._id) {
			const getBusSeats = async () => {
				try {
					const res = await api.get(`/fleets/buses/seats/${journey.bus._id}`);
					setSeats(res.data);
				} catch (err) {
					console.error(err);
				}
			};

			const getBookedSeats = async () => {
				try {
					const res = await api.get(
						`/fleets/journeys/${journey._id}/booked-seats`
					);
					setBookedSeats(res.data);
				} catch (err) {
					console.err(err);
				}
			};

			getBusSeats();
			getBookedSeats();
		} else {
			setIsLoading(false);
		}
	}, [journey]);

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<div className='row'>
					{seats.map((seat, idx) => (
						<div
							className={`col-3 ${
								seat.number === 1 ||
								seat.number === 2 ||
								bookedSeats.map((seat) => seat.seat).includes(seat._id)
									? 'seat-disabled'
									: ''
							}`}
							key={idx}
							onClick={() => onSeatClicked(seat)}
						>
							<div
								className={`d-flex justify-content-center align-items-center align-content-center p-2 mb-2 w-75 seat ${
									selectedSeats.includes(seat) ? 'booked' : ''
								}`}
							>
								{seat.number}
							</div>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default Seats;
