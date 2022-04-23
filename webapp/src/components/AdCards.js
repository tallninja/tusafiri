import AdCard from './AdCard';

const AdCards = () => {
	return (
		<div className='container d-flex justify-content-center align-items-center py-2 my-3'>
			<div className='row'>
				<AdCard
					title='20+ DESTINATIONS'
					text='Our expert team handpicked all destinations in this site'
					iconClass='fa-solid fa-globe'
				/>
				<AdCard
					title='PACKAGE DELIVERIES'
					text='We ensure packages reach their destinations in less than 24 hours'
					iconClass='fa-solid fa-truck-fast'
				/>
				<AdCard
					title='TOP NOTCH SUPPORT'
					text='We are here to help, before, during, and even after your trip'
					iconClass='fa-solid fa-handshake-simple'
				/>
			</div>
		</div>
	);
};

export default AdCards;
