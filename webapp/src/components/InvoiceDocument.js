const InvoiceDocument = ({ invoice, user }) => {
	return (
		<div className='invoice-box mx-2'>
			<table>
				<tbody>
					<tr className='top'>
						<td colSpan='2'>
							<table>
								<tbody>
									<tr>
										<td className='title'>
											<h1>
												<i className='fa-solid fa-bus'></i>
											</h1>
										</td>

										<td>
											Invoice #: {invoice._id}
											<br />
											Created: {new Date(invoice.createdAt).toDateString()}
											<br />
											Due: {new Date(invoice.dueDate).toDateString()}
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>

					<tr className='information'>
						<td colSpan='2'>
							<table>
								<tbody>
									<tr>
										<td>
											Easy Coach.
											<br />
											Nairobi, CBD
											<br />
											P.O. BOX 11614-00100
										</td>

										<td>
											{user.firstName} {user.lastName}
											<br />
											{user.email}
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>

					<tr className='heading'>
						<td>Item</td>

						<td>Amount</td>
					</tr>

					<tr className='item'>
						<td>{invoice.booking?.seats.length} seats</td>

						<td>{invoice.amount}</td>
					</tr>

					<tr className='item'>
						<td>Sales Tax</td>

						<td>{invoice.amount * invoice.salesTax}</td>
					</tr>

					<tr className='total'>
						<td></td>

						<td>Total: Ksh {invoice.totalAmountDue}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default InvoiceDocument;
