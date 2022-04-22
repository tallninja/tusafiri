import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import useApiAuth from '../hooks/useApiAuth';
import Modal from './CustomModal';
import Ticket from './Ticket';
import Spinner from './Spinner';

const TicketView = () => {
	const [ticket, setTicket] = useState({});
	const apiAuth = useApiAuth();
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const res = await apiAuth.get(`/booking-system/tickets/${id}`);
				setTicket(res.data);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
				navigate(-1);
			}
		})();
	}, [id, apiAuth, navigate]);

	const downloadTicket = () => {
		const divToDisplay = document.getElementById('ticket');
		html2canvas(divToDisplay, {
			scale: 1,
		}).then(function (canvas) {
			const divImage = canvas.toDataURL('image/png');
			const pdf = new jsPDF({
				orientation: 'portrait',
				unit: 'cm',
				format: [15, 13.25],
			});
			pdf.addImage(divImage, 'PNG', 0, 0);

			let fileName = ticket?.passengerName?.toLowerCase() || 'ticket';

			if (fileName.split(' ').length > 1) {
				let nameArr = fileName.split(' ');
				nameArr.push('ticket');
				fileName = nameArr.join('_');
			}

			pdf.save(`${fileName}.pdf`);
		});
	};

	const downloadButton = (
		<button className='btn btn-success' onClick={downloadTicket}>
			<i className='fa-solid fa-download'></i> Download
		</button>
	);

	return (
		<div className='h-75'>
			{ticket._id ? (
				<Modal
					size='lg'
					showModal={true}
					title='Download Ticket'
					action={downloadButton}
					onDismiss={() => navigate(-1)}
				>
					<Ticket ticket={ticket} />
				</Modal>
			) : (
				<Spinner />
			)}
		</div>
	);
};

export default TicketView;
