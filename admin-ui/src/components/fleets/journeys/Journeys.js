import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getJourneys, deleteJourney } from '../../../api';

export const Journeys = () => {
	const [journeys, setJourneys] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			let res = await getJourneys();
			if (res.status === 200) {
				setJourneys(res.data);
			} else {
				console.log(res.data);
			}
		})();
	}, []);

	const handleEdit = (id) => {
		navigate(`/fleets/journeys/edit/${id}`);
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this record ?')) {
			let res = await deleteJourney(id);
			if (res.status === 200) {
				setJourneys(journeys.filter((journey) => journey._id !== res.data._id));
			} else {
				console.log(res.data);
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
			<div className='table-responsive-sm'>
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
											? new Date(journey.departureTime)
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
		</>
	);
};
