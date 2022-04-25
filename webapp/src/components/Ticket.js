import { useEffect } from 'react';

const Ticket = ({ ticket }) => {
	useEffect(() => {
		const initialValue = document.body.style.zoom;
		// Change zoom level on mount
		document.body.style.zoom = '100%';

		return () => {
			// Restore default value
			document.body.style.zoom = initialValue;
		};
	}, []);

	return (
		<div className='d-flex justify-content-center align-items-center h-100'>
			<div id='ticket'>
				<div
					id='ticket-heading'
					className='d-flex justify-content-around align-content-center align-items-center bg-dark text-light p-3 w-auto'
				>
					<h1>
						<i className='fa-solid fa-bus'></i>
					</h1>
					<h1>Easy Coach</h1>
				</div>
				<div id='ticket-details' className='container p-3 w-100'>
					<div className='row h-100'>
						<div className='col-6 border-right'>
							<h3>Trip</h3>
							<hr />
							<table className='table table-borderless'>
								<tbody>
									<tr>
										<th>From</th>
										<td>{ticket?.journey?.route?.from?.name || 'N/A'}</td>
									</tr>
									<tr>
										<th>To</th>
										<td>{ticket?.journey?.route?.to?.name || 'N/A'}</td>
									</tr>
									<tr>
										<th>Bus</th>
										<td>{ticket?.journey?.bus?.regNo || 'N/A'}</td>
									</tr>
									<tr>
										<th>Departure</th>
										<td>
											{new Date(
												ticket?.journey?.departureTime
											).toDateString() || 'N/A'}{' '}
											{new Date(
												ticket?.journey?.departureTime
											).toLocaleTimeString() || 'N/A'}
										</td>
									</tr>
									<tr>
										<th>Arrival</th>
										<td>
											{new Date(ticket?.journey?.arrivalTime).toDateString() ||
												'N/A'}{' '}
											{new Date(
												ticket?.journey?.arrivalTime
											).toLocaleTimeString() || 'N/A'}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className='col-6'>
							<h3>Passenger</h3>
							<hr />
							<table className='table table-borderless'>
								<tbody>
									<tr>
										<th>Name</th>
										<td>{ticket?.passengerName || 'N/A'}</td>
									</tr>
									<tr>
										<th>Phone</th>
										<td>{ticket?.passengerPhone || 'N/A'}</td>
									</tr>
									<tr>
										<th>Seat#</th>
										<td>{ticket?.seat?.number || 'N/A'}</td>
									</tr>
									<tr>
										<th>Valid Until</th>
										<td>
											{new Date(ticket?.validUntil).toDateString() || 'N/A'}{' '}
											{new Date(ticket?.validUntil).toLocaleTimeString() ||
												'N/A'}
										</td>
									</tr>
								</tbody>
							</table>
							<div
								id='amount'
								className='bg-dark text-light d-flex justify-content-center h-auto p-3 mt-2'
							>
								<p className='h4'>Ksh {ticket?.journey?.fare || 'N/A'}</p>
							</div>
						</div>
					</div>
				</div>
				<div className='d-flex justify-content-around align-content-center align-items-center bg-dark text-light p-1 w-auto'>
					<div>
						<img
							src={`${process.env.PUBLIC_URL}/assets/images/qr-code.svg`}
							alt='qr code'
							height='100'
							width='100'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Ticket;
