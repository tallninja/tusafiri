import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import useApiAuth from '../hooks/useApiAuth';

import Spinner from './Spinner';
import NoResults from './NoResults';
import Error from './Error';

const Tickets = () => {
	const [tickets, setTickets] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const navigate = useNavigate();
	const { booking } = useParams();
	const apiAuth = useApiAuth();

	useEffect(() => {
		(async () => {
			try {
				const res = await apiAuth.get(`/booking-system/bookings/${booking}`);
				if (!res?.data?.paid) navigate(-1);
				else {
					const tickets = await apiAuth.get(
						`/booking-system/tickets/booking/${booking}`
					);
					setTickets(tickets.data);
					setIsLoading(false);
				}
			} catch (err) {
				setIsLoading(false);
				setIsError(true);
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		})();
	}, [booking, apiAuth, navigate]);

	return (
		<div className='container h-75'>
			<h2>Tickets</h2>
			<hr />
			{tickets.length && !isLoading ? (
				<div className='table-responsive'>
					<table className='table table-striped table-sm'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Code</th>
								<th scope='col'>Passenger Name</th>
								<th scope='col'>Passenger Phone</th>
								<th scope='col'>seat</th>
								<th scope='col'>Bus</th>
								<th scope='col'>From</th>
								<th scope='col'>To</th>
								<th scope='col'>Valid Until</th>
								<th scope='col'>Download</th>
							</tr>
						</thead>
						<tbody>
							{tickets.map((ticket, idx) => {
								return (
									<tr key={ticket._id}>
										<td>{idx + 1}</td>
										<td>{ticket._id}</td>
										<td>{ticket.passengerName}</td>
										<td>{ticket.passengerPhone || '-'}</td>
										<td>{ticket.seat?.number}</td>
										<td>{ticket.journey?.bus?.regNo || '-'}</td>
										<td>{ticket.journey?.route?.from?.name || '-'}</td>
										<td>{ticket.journey?.route?.to?.name || '-'}</td>
										<td>
											{ticket.validUntil
												? new Date(ticket.validUntil).toDateString()
												: '-'}
										</td>
										<td>
											<button
												type='button'
												className='btn btn-primary btn-sm mx-1'
												data-bs-toggle='tooltip'
												data-bs-placement='top'
												title='Download'
												onClick={() => navigate(`/tickets/${ticket._id}`)}
											>
												<i className='fa-solid fa-download'></i>
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			) : isLoading ? (
				<Spinner />
			) : isError ? (
				<Error />
			) : (
				<NoResults />
			)}
		</div>
	);
};

export default Tickets;
