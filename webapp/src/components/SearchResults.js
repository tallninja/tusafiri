import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { searchJourneys } from '../api';
import useQuery from '../hooks/useQuery';
import JourneysTable from './JourneysTable';
import Search from './Search';

import Spinner from './Spinner';
import NoResults from './NoResults';
import Error from './Error';

const SearchResults = () => {
	const [journeys, setJourneys] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

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
				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				setIsError(true);
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
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
				{journeys.length && !isLoading ? (
					<JourneysTable journeys={journeys} />
				) : isLoading ? (
					<Spinner />
				) : isError ? (
					<Error />
				) : (
					<NoResults />
				)}
			</div>
		</>
	);
};

export default SearchResults;
