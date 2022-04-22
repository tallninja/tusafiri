import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getLocations, deleteLocation } from '../../../api';

import NoResults from '../../NoResults';
import Spinner from '../../Spinner';
import Error from '../../Error';

export const Locations = () => {
	const [locations, setLocations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				let res = await getLocations();
				setLocations(res.data);
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
		navigate(`/fleets/locations/edit/${id}`);
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this record ?')) {
			try {
				const res = await deleteLocation(id);
				setLocations(
					locations.filter((location) => location._id !== res.data._id)
				);
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
				<h2>Locations</h2>
				<div>
					<Link
						to={`/fleets/locations/new`}
						className='btn btn-success'
						role={'button'}
					>
						Add
					</Link>
				</div>
			</div>
			{!isLoading && locations.length ? (
				<div className='table-responsive'>
					<table className='table table-striped table-sm'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Name</th>
								<th scope='col'>Code</th>
								<th scope='col'>Latitude</th>
								<th scope='col'>Longitude</th>
								<th scope='col'>Created At</th>
								<th scope='col'>Updated At</th>
								<th scope='col'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{locations.map((location, idx) => {
								return (
									<tr key={location._id}>
										<td>{idx + 1}</td>
										<td>{location.name}</td>
										<td>{location.code}</td>
										<td>{location.lat}</td>
										<td>{location.lng}</td>
										<td>
											{location.createdAt
												? new Date(location.createdAt).toDateString()
												: '-'}
										</td>
										<td>
											{location.updatedAt
												? new Date(location.updatedAt).toDateString()
												: '-'}
										</td>
										<td>
											<button
												type='button'
												className='btn btn-warning btn-sm mx-1'
												data-bs-toggle='tooltip'
												data-bs-placement='top'
												title='Edit'
												onClick={() => handleEdit(location._id)}
											>
												<i className='fa-solid fa-pen-to-square'></i>
											</button>
											<button
												type='button'
												className='btn btn-danger btn-sm mx-1'
												data-bs-toggle='tooltip'
												data-bs-placement='top'
												title='Delete'
												onClick={() => handleDelete(location._id)}
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
