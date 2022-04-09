import { useEffect, useState } from 'react';

import { searchJourneys } from '../api';
import useQuery from '../hooks/useQuery';
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
				<div className='table-responsive-sm my-4'>
					<table className='table table-striped table-lg'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Bus</th>
								<th scope='col'>From</th>
								<th scope='col'>To</th>
								<th scope='col'>Fare</th>
								<th scope='col'>Available Seats</th>
								<th scope='col'>Departure Time</th>
								<th scope='col'>Arrival Time</th>
							</tr>
						</thead>
						<tbody>
							{journeys.map((journey, idx) => {
								return (
									<tr key={journey._id}>
										<td>{idx + 1}</td>
										<td>{journey.bus?.regNo || '-'}</td>
										<td>{journey.route?.from?.name || '-'}</td>
										<td>{journey.route?.to?.name || '-'}</td>
										<td>Ksh {journey.fare}</td>
										<td>
											{journey.availableSeats} / {journey.bus?.capacity}
										</td>
										<td>
											{journey.departureTime
												? new Date(journey.departureTime).toLocaleTimeString()
												: '-'}
										</td>
										<td>
											{journey.arrivalTime
												? new Date(journey.arrivalTime).toLocaleTimeString()
												: '-'}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default SearchResults;
