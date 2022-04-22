import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import useAuth from '../hooks/useAuth';
import { deleteInvoice } from '../api';
import useApiAuth from '../hooks/useApiAuth';

import InvoiceDocument from './InvoiceDocument';
import Timer from './Timer';
import Spinner from './Spinner';

const Invoice = () => {
	const [invoice, setInvoice] = useState({});
	const navigate = useNavigate();
	const apiAuth = useApiAuth();

	const { auth } = useAuth();
	const { booking } = useParams();

	useEffect(() => {
		const fetchInvoice = async () => {
			try {
				const res = await apiAuth.get(
					`/booking-system/invoices/booking/${booking}`
				);
				if (res.data) setInvoice(res.data);
				else navigate('/');
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		};

		fetchInvoice();
	}, [booking, navigate, apiAuth]);

	const cancelBooking = async () => {
		try {
			await deleteInvoice(invoice._id);
			navigate('/');
			toast.info('Your booking has been cancelled.');
		} catch (err) {
			console.error(err?.response?.data);
			toast.error(err?.response?.data?.message || 'An error occured.');
		}
	};

	const handleTimeOut = async () => {
		try {
			const res = await apiAuth.get(
				`/booking-system/invoices/booking/${booking}`
			);
			if (res.data.settled) navigate(`/user/tickets/${invoice.booking._id}`);
			else {
				navigate('/home');
				toast.info('Your booking has expired.');
			}
		} catch (err) {
			console.error(err?.response?.data);
			toast.error(err?.response?.data?.message || 'An error occured.');
		}
	};

	return (
		<>
			{invoice._id ? (
				<div className='container'>
					<div className='d-flex flex-wrap justify-content-between my-3 '>
						<button
							className='btn btn-warning btn-lg frac-width'
							disabled={invoice.settled}
							onClick={cancelBooking}
						>
							Cancel
						</button>
						<button
							className={`btn btn-success btn-lg frac-width ${
								invoice.settled ? '' : 'disabled'
							}`}
							type='submit'
							onClick={() => navigate(`/user/tickets/${invoice.booking._id}`)}
						>
							Next
						</button>
					</div>

					<div className='d-flex flex-wrap justify-content-between align-items-center align-content-center'>
						<h2>Invoice</h2>
						{!invoice.settled ? (
							<div className='d-flex justify-content-end'>
								<h5 className='mx-2'>Deadline: </h5>
								<Timer date={invoice.dueDate} handleTimeOut={handleTimeOut} />
							</div>
						) : (
							<h5 className='mx-2 text-success'>Paid</h5>
						)}
					</div>

					<hr />

					<div className='d-flex flex-column justify-content-center my-3'>
						<InvoiceDocument invoice={invoice} user={auth} />
						<div className='mt-3'>
							<h3>Payment</h3>
							<h5>Steps:</h5>
							<ol className='list-group list-group-numbered'>
								<li className='list-group-item'>
									Click on the Safaricom toolkit on your phone or M-Pesa App.
								</li>
								<li className='list-group-item'>
									Select <b>M-Pesa</b> option.
								</li>
								<li className='list-group-item'>
									Select <b>Lipa na M-pesa</b> option.
								</li>
								<li className='list-group-item'>
									Select <b>Paybill</b> option.
								</li>
								<li className='list-group-item'>
									Select <b>Enter Business No</b> option.
								</li>
								<li className='list-group-item'>
									Enter <b>777777</b> as the business number.
								</li>
								<li className='list-group-item'>
									Enter Account Number: <b>{auth.phoneNo}</b>
								</li>
								<li className='list-group-item'>
									Enter Amount: <b>Ksh {invoice.totalAmountDue}</b>
								</li>
								<li className='list-group-item'>Enter your M-pesa Password.</li>
								<li className='list-group-item'>Complete the transaction.</li>
							</ol>
						</div>
					</div>
				</div>
			) : (
				<Spinner />
			)}
		</>
	);
};

export default Invoice;
