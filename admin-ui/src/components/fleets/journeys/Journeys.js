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
			<div className='table-responsive-xl'>
				<table className='table table-striped table-sm'>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Bus</th>
							<th scope='col'>Route</th>
							<th scope='col'>Fare</th>
							<th scope='col'>Available Seats</th>
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
									<td>{journey.bus ? journey.bus.regNo : '-'}</td>
									<td>{journey.route ? journey.route.name : '-'}</td>
									<td>{journey.fare}</td>
									<td>{journey.availableSeats}</td>
									<td>
										{journey.drivers.length > 0 ? (
											<table>
												<h4 align='center'>Drivers</h4>
												<tr>
													<td>{journey.drivers[0].employeeId}</td>
													<td>{journey.drivers[1].employeeId}</td>
												</tr>
												<tr>
													<td>nested table</td>
													<td>nested table</td>
												</tr>
											</table>
										) : (
											'-'
										)}
									</td>
									<td>
										{journey.departureTime
											? new Date(journey.departureTime).toDateString()
											: '-'}
									</td>
									<td>
										{journey.arrivalTime
											? new Date(journey.arrivalTime).toDateString()
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
										{/* <button
											type='button'
											className='btn btn-outline-dark btn-sm mx-1'
											data-bs-toggle='tooltip'
											data-bs-placement='top'
											title='view'
										>
											<i className='fa-solid fa-eye'></i>
										</button> */}
										{journey.drivers.length !== 2 ? (
											<button
												type='button'
												className='btn btn-outline-dark btn-sm mx-1'
												data-bs-toggle='modal'
												data-bs-target='#addDriverModal'
											>
												<i className='fa-solid fa-bus'></i>{' '}
											</button>
										) : (
											<></>
										)}
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