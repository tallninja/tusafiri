import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getJourneys, deleteJourney } from '../../../api';

import NoResults from '../../NoResults';
import Spinner from '../../Spinner';
import Error from '../../Error';

export const Journeys = () => {
	const [journeys, setJourneys] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				let res = await getJourneys();
				setJourneys(res.data);
				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				setIsError(true);
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		})();
	}, []);

	const handleEdit = (id) => {
		navigate(`/fleets/journeys/edit/${id}`);
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this record ?')) {
			try {
				const res = await deleteJourney(id);
				setJourneys(journeys.filter((journey) => journey._id !== res.data._id));
				toast.success('Journey was deleted.');
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		}
	};

	return (
		<>
			<div className='d-flex justify-content-between pt-3 pb-2 mb-3 border-bottom'>
				<h2>Journeys</h2>
				<div>
					<Link
						to={`/fleets/journeys/new`}
						className='btn btn-success'
						role={'button'}
					>
						Add
					</Link>
				</div>
			</div>
			{!isLoading && journeys.length ? (
				<div className='table-responsive-lg'>
					<table className='table table-striped table-sm'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Id</th>
								<th scope='col'>Bus</th>
								<th scope='col'>Route</th>
								<th scope='col'>Fare</th>
								<th scope='col'>Seats</th>
								<th scope='col'>Drivers</th>
								<th scope='col'>Departure Time</th>
								<th scope='col'>Arrival Time</th>
								<th scope='col'>Created At</th>
								<th scope='col'>Updated At</th>
								<th scope='col'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{journeys.map((journey, idx) => {
								return (
									<tr key={journey._id}>
										<td>{idx + 1}</td>
										<td>{journey._id}</td>
										<td>{journey.bus ? journey.bus.regNo : '-'}</td>
										<td>
											<table className='table table-sm table-borderless my-0'>
												<thead>
													<tr>
														<th colSpan='col' className='p-0 m-0'>
															<p className='p-0 m-0'>
																<small>From:</small>
															</p>
														</th>
														<th colSpan='col' className='p-0 m-0'>
															<p className='p-0 m-0'>
																<small>To:</small>
															</p>
														</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td className='p-0 m-0'>
															<p className='p-0 m-0'>
																<small>{journey.route?.from.code || '-'}</small>
															</p>
														</td>
														<td className='p-0 m-0'>
															<p className='p-0 m-0'>
																<small>{journey.route?.to.code || '-'}</small>
															</p>
														</td>
													</tr>
												</tbody>
											</table>
										</td>
										<td>{journey.fare}</td>
										<td>{journey.availableSeats}</td>
										<td>
											<table className='table table-sm mb-0'>
												<tbody>
													{journey.drivers?.map((driver) => (
														<tr key={driver._id}>
															<td>
																<p className='p-0 m-0'>
																	<small>
																		{driver.firstName} {driver.lastName}
																	</small>
																</p>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</td>
										<td>
											{journey.departureTime
												? new Date(journey.departureTime)
														.toString()
														.split(':')
														.slice(0, -1)
														.join(':')
												: '-'}
										</td>
										<td>
											{journey.arrivalTime
												? new Date(journey.arrivalTime)
														.toString()
														.split(':')
														.slice(0, -1)
														.join(':')
												: '-'}
										</td>
										<td>
											{journey.createdAt
												? new Date(journey.createdAt).toDateString()
												: '-'}
										</td>
										<td>
											{journey.updatedAt
												? new Date(journey.updatedAt).toDateString()
												: '-'}
										</td>
										<td>
											<button
												type='button'
												className='btn btn-warning btn-sm mx-1'
												data-bs-toggle='tooltip'
												data-bs-placement='top'
												title='Edit'
												onClick={() => handleEdit(journey._id)}
											>
												<i className='fa-solid fa-pen-to-square'></i>
											</button>
											<button
												type='button'
												className='btn btn-danger btn-sm mx-1'
												data-bs-toggle='tooltip'
												data-bs-placement='top'
												title='Delete'
												onClick={() => handleDelete(journey._id)}
											>
												<i className='fa-solid fa-trash-can'></i>
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			) : isLoading ? (
				<Spinner />
			) : isError ? (
				<Error />
			) : (
				<NoResults />
			)}
		</>
	);
};
