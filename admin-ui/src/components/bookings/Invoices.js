import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { getInvoices, deleteInvoice } from '../../api';

import NoResults from '../NoResults';
import Spinner from '../Spinner';
import Error from '../Error';

export const Invoices = () => {
	const [invoices, setInvoices] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const res = await getInvoices();
				setInvoices(res.data);
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
				const res = await deleteInvoice(id);
				setInvoices(invoices.filter((invoice) => invoice._id !== res.data._id));
				toast.success('Invoice was deleted.');
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		}
	};

	return (
		<>
			<div className='d-flex justify-content-between pt-3 pb-2 mb-3 border-bottom'>
				<h2>Invoices</h2>
			</div>
			{!isLoading && invoices.length ? (
				<div className='table-responsive'>
					<table className='table table-striped table-sm'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Id</th>
								<th scope='col'>Booking</th>
								<th scope='col'>Amount</th>
								<th scope='col'>Sales Tax</th>
								<th scope='col'>Amount Due</th>
								<th scope='col'>Due Date</th>
								<th scope='col'>Settled</th>
								<th scope='col'>Created At</th>
								<th scope='col'>Updated At</th>
								<th scope='col'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{invoices.map((invoice, idx) => {
								return (
									<tr key={invoice._id}>
										<td>{idx + 1}</td>
										<td>{invoice._id}</td>
										<td>{invoice.booking || '-'}</td>
										<td>{invoice.amount}</td>
										<td>{invoice.salesTax * 100}%</td>
										<td>{invoice.totalAmountDue}</td>
										<td>
											{invoice.dueDate
												? new Date(invoice.dueDate).toDateString()
												: '-'}
										</td>
										<td>
											{invoice.settled ? (
												<h4>
													<i
														class='fa-solid fa-check'
														style={{ color: 'green' }}
													></i>
												</h4>
											) : (
												<h4>
													<i
														class='fa-solid fa-xmark'
														style={{ color: 'red' }}
													></i>
												</h4>
											)}
										</td>
										<td>
											{invoice.createdAt
												? new Date(invoice.createdAt).toDateString()
												: '-'}
										</td>
										<td>
											{invoice.updatedAt
												? new Date(invoice.updatedAt).toDateString()
												: '-'}
										</td>
										<td>
											<button
												type='button'
												className='btn btn-danger btn-sm mx-1'
												data-bs-toggle='tooltip'
												data-bs-placement='top'
												title='Delete'
												onClick={() => handleDelete(invoice._id)}
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
