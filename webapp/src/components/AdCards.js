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
					title='BEST PRICE GUARANTEE'
					text='Price match within 48 hours of order confirmation'
					iconClass='fa-solid fa-dollar-sign'
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
