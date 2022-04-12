import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import { getInvoice, deleteInvoice } from '../api';
import InvoiceDocument from './InvoiceDocument';
import Spinner from './Spinner';

const Invoice = () => {
	const [invoice, setInvoice] = useState({});
	const navigate = useNavigate();

	const { auth } = useAuth();
	const { id } = useParams();

	useEffect(() => {
		const fetchInvoice = async () => {
			try {
				const invoice = await getInvoice(id);
				setInvoice(invoice);
			} catch (err) {
				console.error(err);
			}
		};

		fetchInvoice();
	}, [id, navigate]);

	const cancelBooking = async () => {
		try {
			await deleteInvoice(invoice._id);
			navigate('/');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<div className='container'>
				<h2>Invoice</h2>
				<hr />
			</div>
			<div className='container d-flex flex-wrap justify-content-center'>
				<InvoiceDocument invoice={invoice} user={auth} />
				<div>
					<h3>Payment</h3>
					<h5>Steps</h5>
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
			<div className='d-grid my-3 container'>
				<button className='btn-primary btn-lg' onClick={cancelBooking}>
					Cancel Booking
				</button>
			</div>
		</>
	);
};

export default Invoice;
