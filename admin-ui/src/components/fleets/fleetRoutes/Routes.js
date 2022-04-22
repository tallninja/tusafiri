import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getRoutes, deleteRoute } from '../../../api';

import NoResults from '../../NoResults';
import Spinner from '../../Spinner';
import Error from '../../Error';

export const FleetRoutes = () => {
	const [routes, setRoutes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const res = await getRoutes();
				setRoutes(res.data);
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
		navigate(`/fleets/routes/edit/${id}`);
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this record ?')) {
			try {
				const res = await deleteRoute(id);
				setRoutes(routes.filter((route) => route._id !== res.data._id));
				toast.success(`${res.data.name} was deleted.`);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		}
	};

	return (
		<>
			<div className='d-flex justify-content-between pt-3 pb-2 mb-3 border-bottom'>
				<h2>Routes</h2>
				<div>
					<Link
						to={`/fleets/routes/new`}
						className='btn btn-success'
						role={'button'}
					>
						Add
					</Link>
				</div>
			</div>
			{routes.length ? (
				<div className='table-responsive'>
					<table className='table table-striped table-sm'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Name</th>
								<th scope='col'>From</th>
								<th scope='col'>To</th>
								<th scope='col'>Created At</th>
								<th scope='col'>Updated At</th>
								<th scope='col'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{routes.map((route, idx) => {
								return (
									<tr key={route._id}>
										<td>{idx + 1}</td>
										<td>{route.name}</td>
										<td>{route.from.name}</td>
										<td>{route.to.name}</td>
										<td>
											{route.createdAt
												? new Date(route.createdAt).toDateString()
												: '-'}
										</td>
										<td>
											{route.updatedAt
												? new Date(route.updatedAt).toDateString()
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
											<button
												type='button'
												className='btn btn-warning btn-sm mx-1'
												data-bs-toggle='tooltip'
												data-bs-placement='top'
												title='Edit'
												onClick={() => handleEdit(route._id)}
											>
												<i className='fa-solid fa-pen-to-square'></i>
											</button>
											<button
												type='button'
												className='btn btn-danger btn-sm mx-1'
												data-bs-toggle='tooltip'
												data-bs-placement='top'
												title='Delete'
												onClick={() => handleDelete(route._id)}
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
