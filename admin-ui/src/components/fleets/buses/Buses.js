import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getBuses, deleteBus } from '../../../api';

import NoResults from '../../NoResults';
import Spinner from '../../Spinner';
import Error from '../../Error';

export const Buses = () => {
	const [buses, setBuses] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				let res = await getBuses();
				setBuses(res.data);
				setIsLoading(false);
			} catch (err) {
				console.error(err);
				setIsLoading(false);
				setIsError(true);
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		})();
	}, []);

	const handleEdit = (id) => {
		navigate(`/fleets/buses/edit/${id}`);
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this record ?')) {
			try {
				const res = await deleteBus(id);
				setBuses(buses.filter((bus) => bus._id !== res.data._id));
				toast.success(`${res.data.regNo} was deleted.`);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		}
	};

	return (
		<>
			<div className='d-flex justify-content-between pt-3 pb-2 mb-3 border-bottom'>
				<h2>Buses</h2>
				<div>
					<Link
						to={`/fleets/buses/new`}
						className='btn btn-success'
						role={'button'}
					>
						Add
					</Link>
				</div>
			</div>
			{!isLoading && buses.length ? (
				<div className='table-responsive'>
					<table className='table table-striped table-sm'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Reg No</th>
								<th scope='col'>Make</th>
								<th scope='col'>YoM</th>
								<th scope='col'>Capacity</th>
								<th scope='col'>Created At</th>
								<th scope='col'>Updated At</th>
								<th scope='col'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{buses.map((bus, idx) => {
								return (
									<tr key={bus._id}>
										<td>{idx + 1}</td>
										<td>{bus.regNo}</td>
										<td>{bus.make}</td>
										<td>{bus.yom}</td>
										<td>{bus.capacity}</td>
										<td>
											{bus.createdAt
												? new Date(bus.createdAt).toDateString()
												: '-'}
										</td>
										<td>
											{bus.updatedAt
												? new Date(bus.updatedAt).toDateString()
												: '-'}
										</td>
										<td>
											<button
												type='button'
												className='btn btn-outline-dark btn-sm mx-1'
												data-bs-toggle='tooltip'
												data-bs-placement='top'
												title='view'
											>
												<i className='fa-solid fa-eye'></i>
											</button>
											<button
												type='button'
												className='btn btn-warning btn-sm mx-1'
												data-bs-toggle='tooltip'
												data-bs-placement='top'
												title='Edit'
												onClick={() => handleEdit(bus._id)}
											>
												<i className='fa-solid fa-pen-to-square'></i>
											</button>
											<button
												type='button'
												className='btn btn-danger btn-sm mx-1'
												data-bs-toggle='tooltip'
												data-bs-placement='top'
												title='Delete'
												onClick={() => handleDelete(bus._id)}
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
