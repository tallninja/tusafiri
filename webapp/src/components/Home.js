import { useEffect, useState } from 'react';

import Search from './Search';
import ShowcaseCard from './ShowcaseCard';
import useSearch from '../hooks/useSearch';
import { searchJourneys } from '../api';
import AdCards from './AdCards';
import ShowcaseCards from './ShowcaseCards';

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
			<AdCards />
			<ShowcaseCards />
		</>
	);
};

export default Home;
