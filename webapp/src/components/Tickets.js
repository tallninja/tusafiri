import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useApiAuth from '../hooks/useApiAuth';

import NoResults from './NoResults';

const Tickets = () => {
	const [tickets, setTickets] = useState([]);
	const { booking } = useParams();

	const apiAuth = useApiAuth();

	useEffect(() => {
		(async () => {
			try {
				const res = await apiAuth.get(
					`/booking-system/tickets/booking/${booking}`
				);
				setTickets(res.data);
			} catch (err) {
				console.error(err);
			}
		})();
	}, [booking, apiAuth]);

	return (
		<div className='container h-75'>
			<h2>Tickets</h2>
			<hr />
			{tickets.length ? (
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
												onClick={() => console.log(ticket._id)}
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
			) : (
				<NoResults />
			)}
		</div>
	);
};

export default Tickets;
