import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTickets, deleteTicket } from '../../api';

export const Tickets = () => {
	const [tickets, setTickets] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			let res = await getTickets();
			if (res.status === 200) {
				setTickets(res.data);
			} else {
				console.log(res.data);
			}
		})();
	}, []);

	const handleEdit = (id) => {
		navigate(`/tickets/edit/${id}`);
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this record ?')) {
			let res = await deleteTicket(id);
			if (res.status === 200) {
				setTickets(tickets.filter((ticket) => ticket._id !== res.data._id));
			} else {
				console.log(res.data);
			}
		}
	};

	return (
		<>
			<div className='d-flex justify-content-between pt-3 pb-2 mb-3 border-bottom'>
				<h2>Tickets</h2>
				<div>
					<Link to={`/tickets/new`} className='btn btn-success' role={'button'}>
						Add
					</Link>
				</div>
			</div>
			<div className='table-responsive'>
				<table className='table table-striped table-sm'>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Journey</th>
							<th scope='col'>Seats</th>
							<th scope='col'>Paid</th>
							<th scope='col'>Created At</th>
							<th scope='col'>Updated At</th>
							<th scope='col'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{tickets.map((ticket, idx) => {
							return (
								<tr key={ticket._id}>
									<td>{idx + 1}</td>
									<td>{ticket.journey?.id}</td>
									<td>{ticket.seats.map((seat) => seat.number + ', ')}</td>
									<td>
										{ticket.paid ? (
											<i
												class='fa-solid fa-check'
												style={{ color: 'green' }}
											></i>
										) : (
											<i class='fa-solid fa-xmark' style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										{ticket.createdAt
											? new Date(ticket.createdAt).toDateString()
											: '-'}
									</td>
									<td>
										{ticket.updatedAt
											? new Date(ticket.updatedAt).toDateString()
											: '-'}
									</td>
									<td>
										<button
											type='button'
											className='btn btn-warning btn-sm mx-1'
											data-bs-toggle='tooltip'
											data-bs-placement='top'
											title='Edit'
											onClick={() => handleEdit(ticket._id)}
										>
											<i className='fa-solid fa-pen-to-square'></i>
										</button>
										<button
											type='button'
											className='btn btn-danger btn-sm mx-1'
											data-bs-toggle='tooltip'
											data-bs-placement='top'
											title='Delete'
											onClick={() => handleDelete(ticket._id)}
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
		</>
	);
};
