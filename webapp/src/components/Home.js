import { useEffect, useState } from 'react';

import Search from './Search';
import ShowcaseCard from './ShowcaseCard';
import useSearch from '../hooks/useSearch';
import { searchJourneys } from '../api';

const Home = () => {
	const handleSearch = async (terms) => {
		try {
			const journeys = await searchJourneys(terms);
			console.log(journeys);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<Search handleSearch={handleSearch} />
			<div className='container d-flex justify-content-center align-items-center py-2 my-3'>
				<div className='row'>
					<div className='col-md-4 d-flex mx-auto my-2 p-4 primary-invert'>
						<h1 className='mx-3'>
							<i className='fa-solid fa-globe'></i>
						</h1>
						<div className='row'>
							<h4>700+ DESTINATIONS</h4>
							<p>Our expert team handpicked all destinations in this site</p>
						</div>
					</div>
					<div className='col-md-4 d-flex mx-auto my-2 p-4 primary-invert'>
						<h1 className='mx-3'>
							<i className='fa-solid fa-dollar-sign'></i>
						</h1>
						<div className='row'>
							<h4>BEST PRICE GUARANTEE</h4>
							<p>Price match within 48 hours of order confirmation</p>
						</div>
					</div>
					<div className='col-md-4 d-flex mx-auto my-2 p-4 primary-invert'>
						<h1 className='mx-3'>
							<i className='fa-solid fa-handshake-simple'></i>
						</h1>
						<div className='row'>
							<h4>TOP NOTCH SUPPORT</h4>
							<p>
								We are here to help, before, during, and even after your trip.
							</p>
						</div>
					</div>
				</div>
			</div>

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
		</>
	);
};

export default Home;
