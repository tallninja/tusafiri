import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getBuses, deleteBus } from '../../../api';
import NoResults from '../../NoResults';

export const Buses = () => {
	const [buses, setBuses] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			let res = await getBuses();
			if (res.status === 200) {
				setBuses(res.data);
			} else {
				console.log(res.data);
				window.alert(JSON.stringify(res.data));
			}
		})();
	}, []);

	const handleEdit = (id) => {
		navigate(`/fleets/buses/edit/${id}`);
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this record ?')) {
			let res = await deleteBus(id);
			if (res.status === 200) {
				setBuses(buses.filter((bus) => bus._id !== res.data._id));
			} else {
				console.log(res.data);
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
			{buses.length ? (
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
			) : (
				<NoResults />
			)}
		</>
	);
};
