import { useEffect, useState } from 'react';

import { searchJourneys } from '../api';
import useSearch from '../hooks/useSearch';

const SearchResults = () => {
	const [journeys, setJourneys] = useState([]);
	const { search } = useSearch();

	useEffect(() => {
		(async () => {
			try {
				// console.log(search);
				const results = await searchJourneys(search);
				setJourneys(results);
			} catch (err) {
				console.error(err);
			}
		})();
	}, [search]);

	return (
		<div className='container'>
			<h1>Search Results</h1>
			<ul className='list-group my-3'>
				{JSON.stringify(journeys)}
				<li className='list-group-item'>Cras justo odio</li>
				<li className='list-group-item'>Dapibus ac facilisis in</li>
				<li className='list-group-item'>Morbi leo risus</li>
				<li className='list-group-item'>Porta ac consectetur ac</li>
				<li className='list-group-item'>Vestibulum at eros</li>
			</ul>
		</div>
	);
};

export default SearchResults;
