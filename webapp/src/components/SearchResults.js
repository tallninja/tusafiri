import { useEffect, useState } from 'react';

import { searchJourneys } from '../api';
import useQuery from '../hooks/useQuery';
import JourneysTable from './JourneysTable';
import NoResults from './NoResults';
import Search from './Search';

const SearchResults = () => {
	const [journeys, setJourneys] = useState([]);
	const query = useQuery();

	useEffect(() => {
		let search = {
			from: query.get('from'),
			to: query.get('to'),
			date: query.get('date'),
		};

		const getJourneys = async (search) => {
			try {
				const results = await searchJourneys(search);
				setJourneys(results);
			} catch (err) {
				console.error(err);
			}
		};

		getJourneys(search);
	}, [query]);

	return (
		<>
			<Search
				defaultValues={{
					from: query.get('from'),
					to: query.get('to'),
					date: query.get('date'),
				}}
			/>
			<div className='container'>
				<h1>Search Results</h1>
				<hr />
				<div className='container d-flex flex-wrap justify-content-around align-items-center p-2 w-100 search-strip'>
					<div className='d-flex justify-content-evenly align-items-center'>
						<h2>{query.get('from')}</h2>
						<h4 className='mx-4'>
							<i className='fa fa-long-arrow-right'></i>
						</h4>
						<h2>{query.get('to')}</h2>
					</div>

					<div className='d-flex justify-content-evenly align-items-center'>
						<h2>{new Date(query.get('date')).toDateString()}</h2>
					</div>
				</div>
				{journeys.length ? (
					<JourneysTable journeys={journeys} />
				) : (
					<NoResults />
				)}
			</div>
		</>
	);
};

export default SearchResults;
