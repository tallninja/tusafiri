import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRoutes, deleteRoute } from '../../../api';

export const FleetRoutes = () => {
	const [routes, setRoutes] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			let res = await getRoutes();
			if (res.status === 200) {
				setRoutes(res.data);
			} else {
				console.log(res.data);
				window.alert(JSON.stringify(res.data));
			}
		})();
	}, []);

	const handleEdit = (id) => {
		navigate(`/fleets/routes/edit/${id}`);
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this record ?')) {
			let deletedRoute = await deleteRoute(id);
			setRoutes(routes.filter((route) => route._id !== deletedRoute._id));
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
		</>
	);
};