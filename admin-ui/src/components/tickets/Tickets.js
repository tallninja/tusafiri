import React, { useState, useEffect } from 'react';

import useApiAuth from '../../hooks/useApiAuth';
import useAuth from '../../hooks/useAuth';
import NoResults from '../NoResults';

export const Tickets = () => {
	const [tickets, setTickets] = useState([]);

	const apiAuth = useApiAuth();
	const { auth } = useAuth();

	useEffect(() => {
		(async () => {
			try {
				let res = await apiAuth.get('/booking-system/tickets');
				setTickets(res.data);
			} catch (err) {
				console.error(err);
			}
		})();
	}, [apiAuth]);

	const deleteTicket = async (id) => {
		if (window.confirm('Are you sure you want to delete this record ?')) {
			try {
				let deletedTicket = await apiAuth.delete(
					`/booking-system/tickets/${id}`
				);
				setTickets(
					tickets.filter((ticket) => ticket._id !== deletedTicket._id)
				);
			} catch (err) {
				console.error(err);
			}
		}
	};

	return (
		<>
			<div className='d-flex justify-content-between pt-3 pb-2 mb-3 border-bottom'>
				<h2>Tickets</h2>
			</div>
			{tickets.length ? (
				<div className='table-responsive'>
					<table className='table table-striped table-sm'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Id</th>
								<th scope='col'>Passenger Name</th>
								<th scope='col'>Passenger Phone</th>
								<th scope='col'>seat</th>
								<th scope='col'>Journey</th>
								<th scope='col'>Booking</th>
								<th scope='col'>User</th>
								<th scope='col'>Created At</th>
								<th scope='col'>Action</th>
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
										<td>{ticket.journey}</td>
										<td>{ticket.booking}</td>
										<td>
											{ticket.user?.firstName} {ticket.user?.lastName}
										</td>
										<td>
											{ticket.createdAt
												? new Date(ticket.createdAt).toDateString()
												: '-'}
										</td>
										<td>
											<button
												type='button'
												className={`btn btn-danger btn-sm mx-1 ${
													ticket._id === auth.id ? 'disabled' : ''
												}`}
												data-bs-toggle='tooltip'
												data-bs-placement='top'
												title='Delete'
												onClick={() => deleteTicket(ticket._id)}
											>
												<i className='fa-solid fa-trash-can'></i>
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
		</>
	);
};
