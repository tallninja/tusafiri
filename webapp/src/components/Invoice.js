import { useEffect } from 'react';

import useBooking from '../hooks/useBooking';
import { createBooking } from '../api';

const Invoice = () => {
	const { booking } = useBooking();

	useEffect(() => {
		console.log(booking);
		const makeBooking = async () => {
			try {
				const invoice = await createBooking(booking);
				console.log(invoice);
			} catch (err) {
				console.error(err);
			}
		};

		makeBooking();
	}, [booking]);

	return (
		<div className='container'>
			<h1>Invoice</h1>
		</div>
	);
};

export default Invoice;
