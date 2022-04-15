import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getBookings, deleteBooking } from '../../api';
import NoResults from '../NoResults';

export const Bookings = () => {
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		(async () => {
			let res = await getBookings();
			if (res.status === 200) {
				setBookings(res.data);
			} else {
				console.log(res.data);
			}
		})();
	}, []);

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this record ?')) {
			let res = await deleteBooking(id);
			if (res.status === 200) {
				setBookings(bookings.filter((booking) => booking._id !== res.data._id));
			} else {
				console.log(res.data);
			}
		}
	};

	return (
		<>
			<div className='d-flex justify-content-between pt-3 pb-2 mb-3 border-bottom'>
				<h2>Bookings</h2>
				<div>
					<Link
						to={`/bookings/new`}
						className='btn btn-success'
						role={'button'}
					>
						Add
					</Link>
				</div>
			</div>
			{bookings.length ? (
				<div className='table-responsive'>
					<table className='table table-striped table-sm'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Id</th>
								<th scope='col'>Journey</th>
								<th scope='col'>Seats</th>
								<th scope='col'>Paid</th>
								<th scope='col'>Created At</th>
								<th scope='col'>Updated At</th>
								<th scope='col'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{bookings.map((booking, idx) => {
								return (
									<tr key={booking._id}>
										<td>{idx + 1}</td>
										<td>{booking._id}</td>
										<td>{booking.journey || '-'}</td>
										<td>{booking.seats.map((seat) => seat.number + ', ')}</td>
										<td>
											{booking.paid ? (
												<i
													className='fa-solid fa-check'
													style={{ color: 'green' }}
												></i>
											) : (
												<i
													className='fa-solid fa-xmark'
													style={{ color: 'red' }}
												></i>
											)}
										</td>
										<td>
											{booking.createdAt
												? new Date(booking.createdAt).toDateString()
												: '-'}
										</td>
										<td>
											{booking.updatedAt
												? new Date(booking.updatedAt).toDateString()
												: '-'}
										</td>
										<td>
											<button
												type='button'
												className='btn btn-danger btn-sm mx-1'
												data-bs-toggle='tooltip'
												data-bs-placement='top'
												title='Delete'
												onClick={() => handleDelete(booking._id)}
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
