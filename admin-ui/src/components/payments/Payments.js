import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import useApiAuth from '../../hooks/useApiAuth';

import NoResults from '../NoResults';
import Spinner from '../Spinner';
import Error from '../Error';

export const Payments = () => {
	const [payments, setPayments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const apiAuth = useApiAuth();

	useEffect(() => {
		(async () => {
			try {
				let res = await apiAuth.get('/booking-system/payments');
				setPayments(res.data);
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
		<>
			<div className='d-flex justify-content-between pt-3 pb-2 mb-3 border-bottom'>
				<h2>Payments</h2>
			</div>
			{!isLoading && payments.length ? (
				<div className='table-responsive'>
					<table className='table table-striped table-sm'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Id</th>
								<th scope='col'>User</th>
								<th scope='col'>Invoice</th>
								<th scope='col'>Amount</th>
								<th scope='col'>Date</th>
							</tr>
						</thead>
						<tbody>
							{payments.map((payment, idx) => {
								return (
									<tr key={payment._id}>
										<td>{idx + 1}</td>
										<td>{payment._id}</td>
										<td>
											{payment.user?.firstName} {payment.user?.lastName}
										</td>
										<td>{payment.invoice}</td>
										<td>{payment.amountPaid}</td>
										<td>
											{payment.date
												? new Date(payment.date).toDateString()
												: '-'}
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
