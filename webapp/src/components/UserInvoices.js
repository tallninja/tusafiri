import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import useApiAuth from '../hooks/useApiAuth';
import NoResults from './NoResults';
import Spinner from './Spinner';
import Error from './Error';

const UserInvoices = () => {
	const [invoices, setInvoices] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const apiAuth = useApiAuth();

	useEffect(() => {
		(async () => {
			try {
				const res = await apiAuth.get('/booking-system/invoices/user');
				setInvoices(res.data);
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
			<h3>My Invoices</h3>
			<hr />
			{!isLoading && invoices.length ? (
				<table className='table table-lg table-responsive-lg'>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>id</th>
							<th scope='col'>Booking</th>
							<th scope='col'>Amount</th>
							<th scope='col'>Date</th>
							<th scope='col'>Settled</th>
							<th scope='col'>View</th>
						</tr>
					</thead>
					<tbody>
						{invoices.map((invoice, idx) => {
							return (
								<tr key={idx}>
									<td>{idx}</td>
									<td>{invoice?._id || '_'}</td>
									<td>{invoice?.booking || '_'}</td>
									<td>Ksh {invoice?.totalAmountDue || '_'}</td>
									<td>{new Date(invoice?.dueDate).toDateString()}</td>
									<td>
										{invoice?.settled ? (
											<i className='fa-solid fa-check text-success'></i>
										) : (
											<i className='fa-solid fa-xmark text-danger'></i>
										)}
									</td>
									<td>
										<Link
											to={`/user/invoices/${invoice.booking}`}
											className='btn btn-dark'
										>
											<i className='fa-solid fa-eye'></i>
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

export default UserInvoices;
