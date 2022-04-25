import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getBookings, deleteBooking } from '../../api';

import NoResults from '../NoResults';
import Spinner from '../Spinner';
import Error from '../Error';

export const Bookings = () => {
	const [bookings, setBookings] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const res = await getBookings();
				setBookings(res.data);
				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				setIsError(true);
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		})();
	}, []);

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this record ?')) {
			try {
				const res = await deleteBooking(id);
				toast.success('Booking was deleted.');
				setBookings(bookings.filter((booking) => booking._id !== res.data._id));
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
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
			{!isLoading && bookings.length ? (
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
												<h4>
													<i
														className='fa-solid fa-check'
														style={{ color: 'green' }}
													></i>
												</h4>
											) : (
												<h4>
													<i
														className='fa-solid fa-xmark'
														style={{ color: 'red' }}
													></i>
												</h4>
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
