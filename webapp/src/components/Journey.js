import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { api } from '../api/api';
import useBooking from '../hooks/useBooking';
import useAuth from '../hooks/useAuth';

import Seats from './Seats';
import JourneyDetails from './JourneyDetails';
import TicketsForm from './TicketsForm';

const Journey = () => {
	const [journey, setJourney] = useState({});
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [amount, setAmount] = useState(0);

	const navigate = useNavigate();
	const params = useParams();
	const { auth } = useAuth();

	const { setBooking } = useBooking();

	useEffect(() => {
		(async () => {
			try {
				const res = await api.get(`/fleets/journeys/${params.id}`);
				setJourney(res.data);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
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

	const handleSubmit = (e, tickets) => {
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

			<div className='row mt-4 p-2'>
				<div className='card col-md-6 h-auto'>
					<div className='card-body'>
						<h1 className='card-title'>Details</h1>
						<hr />
						<JourneyDetails journey={journey} />
					</div>
				</div>

				<div className='card col-md-6'>
					<div className='card-body'>
						<h1 className='card-title'>Seats</h1>
						<hr />
						<Seats
							journey={journey}
							onSeatClicked={handleSeatClicked}
							selectedSeats={selectedSeats}
						/>
					</div>
				</div>
			</div>

			<div className='card'>
				<div className='card-body'>
					<h1 className='card-title'>Tickets</h1>
					<hr />
					<TicketsForm
						selectedSeats={selectedSeats}
						amount={amount}
						auth={auth}
						journey={journey}
						handleSubmit={handleSubmit}
					/>
				</div>
			</div>
		</div>
	);
};

export default Journey;
