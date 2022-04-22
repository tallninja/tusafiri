import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { api } from '../api/api';

import Spinner from './Spinner';
import NoResults from './NoResults';
import Error from './Error';

const Seats = ({ journey, onSeatClicked, selectedSeats }) => {
	const [seats, setSeats] = useState([]);
	const [bookedSeats, setBookedSeats] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		if (journey._id) {
			(async () => {
				try {
					const res = await api.get(`/fleets/buses/seats/${journey.bus._id}`);
					setSeats(res.data);
				} catch (err) {
					setIsLoading(false);
					setIsError(true);
					console.error(err?.response?.data);
					toast.error(err?.response?.data?.message || 'An error occured.');
				}
			})();
		}
	}, [journey]);

	useEffect(() => {
		if (journey._id) {
			(async () => {
				try {
					const res = await api.get(
						`/fleets/journeys/${journey._id}/booked-seats`
					);
					setBookedSeats(res.data);
				} catch (err) {
					setIsLoading(false);
					setIsError(true);
					console.error(err?.response?.data);
					toast.error(err?.response?.data?.message || 'An error occured.');
				}
			})();
		}
	}, [journey]);

	useEffect(() => {
		console.log('rerender');
		if (seats.length) setIsLoading(false);
	}, [seats, bookedSeats]);

	return (
		<>
			{!isLoading && seats.length ? (
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
			) : isLoading ? (
				<Spinner />
			) : isError ? (
				<Error />
			) : (
				<NoResults />
			)}
		</>
	);
};

export default Seats;
