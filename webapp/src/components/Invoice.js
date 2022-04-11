import { useEffect, useState } from 'react';

import useAuth from '../hooks/useAuth';
import useBooking from '../hooks/useBooking';
import { createBooking } from '../api';
import InvoiceDocument from './InvoiceDocument';
import { useNavigate } from 'react-router-dom';

const Invoice = () => {
	const [invoice, setInvoice] = useState({});
	const { auth } = useAuth();
	const { booking } = useBooking();
	const navigate = useNavigate();

	useEffect(() => {
		console.log(booking);
		if (booking.seats) {
			const makeBooking = async () => {
				try {
					const invoice = await createBooking(booking);
					setInvoice(invoice);
				} catch (err) {
					console.error(err);
				}
			};

			makeBooking();
		} else {
			navigate(-1);
		}
	}, [booking, navigate]);

	return (
		<>
			<div className='container'>
				<h2>Invoice</h2>
				<hr />
			</div>
			<div className='d-flex flex-wrap justify-content-center'>
				<InvoiceDocument invoice={invoice} user={auth} />
				<div className='mx-2'>
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
							Enter Amount: <b>Ksh {2000}</b>
						</li>
						<li className='list-group-item'>Enter your M-pesa Password.</li>
						<li className='list-group-item'>Complete the transaction.</li>
					</ol>
				</div>
			</div>
		</>
	);
};

export default Invoice;
