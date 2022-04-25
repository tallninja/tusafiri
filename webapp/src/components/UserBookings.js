import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import useApiAuth from '../hooks/useApiAuth';

import NoResults from './NoResults';
import Spinner from './Spinner';
import Error from './Error';

const UserBookings = () => {
	const [bookings, setBookings] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const apiAuth = useApiAuth();

	useEffect(() => {
		(async () => {
			try {
				const res = await apiAuth.get('/booking-system/bookings/user');
				setBookings(res.data);
				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				setIsError(true);
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		})();
	}, [apiAuth]);

	return (
		<div className='container h-75 mt-4'>
			<h3>My Bookings</h3>
			<hr />
			{!isLoading && bookings.length ? (
				<table className='table table-lg table-responsive-lg'>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>id</th>
							<th scope='col'>From</th>
							<th scope='col'>To</th>
							<th scope='col'>Date</th>
							<th scope='col'>Paid</th>
							<th scope='col'>Tickets</th>
							<th scope='col'>Invoice</th>
						</tr>
					</thead>
					<tbody>
						{bookings.map((booking, idx) => {
							return (
								<tr key={idx}>
									<td>{idx}</td>
									<td>{booking?._id || '_'}</td>
									<td>{booking?.journey?.route?.from?.name || '_'}</td>
									<td>{booking?.journey?.route?.to?.name || '_'}</td>
									<td>
										{new Date(booking?.journey?.departureTime).toDateString()}
									</td>
									<td>
										{booking?.paid ? (
											<i className='fa-solid fa-check text-success'></i>
										) : (
											<i className='fa-solid fa-xmark text-danger'></i>
										)}
									</td>
									<td>
										<Link
											to={`/user/tickets/${booking._id}`}
											className='btn btn-dark'
										>
											<i className='fa-solid fa-ticket'></i>
										</Link>
									</td>
									<td>
										<Link
											to={`/user/invoices/${booking._id}`}
											className='btn btn-dark'
										>
											<i className='fa-solid fa-file-invoice'></i>
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
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

export default UserBookings;
