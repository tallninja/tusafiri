import React, { useState, useEffect } from 'react';

import useApiAuth from '../../hooks/useApiAuth';
import NoResults from '../NoResults';

export const Payments = () => {
	const [payments, setPayments] = useState([]);

	const apiAuth = useApiAuth();

	useEffect(() => {
		(async () => {
			try {
				let res = await apiAuth.get('/booking-system/payments');
				setPayments(res.data);
			} catch (err) {
				console.error(err);
			}
		})();
	}, [apiAuth]);

	return (
		<>
			<div className='d-flex justify-content-between pt-3 pb-2 mb-3 border-bottom'>
				<h2>Payments</h2>
			</div>
			{payments.length ? (
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
			) : (
				<NoResults />
			)}
		</>
	);
};
