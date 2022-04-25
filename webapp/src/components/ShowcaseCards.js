import ShowcaseCard from './ShowcaseCard';

const ShowcaseCards = () => {
	return (
		<div className='container d-flex flex-md-row flex-column justify-content-center align-items-center py-2 my-3'>
			<ShowcaseCard
				heading='Search'
				text='Choose your origin, destination & journey dates'
				iconClass='fa-solid fa-magnifying-glass'
			/>
			<ShowcaseCard
				heading='Select'
				text='Select your desired trip and choose your seats'
				iconClass='fa-solid fa-bus'
			/>
			<ShowcaseCard
				heading='Pay'
				text='Pay for the tickets via M-Pesa at your convenience'
				iconClass='fa-solid fa-wallet'
			/>
		</div>
	);
};

export default ShowcaseCards;
