import React, { useState, useEffect } from 'react';

import { deleteUser } from '../../api';
import useApiAuth from '../../hooks/useApiAuth';
import useAuth from '../../hooks/useAuth';
import NoResults from '../NoResults';

export const Users = () => {
	const [users, setUsers] = useState([]);

	const apiAuth = useApiAuth();
	const { auth } = useAuth();

	useEffect(() => {
		(async () => {
			try {
				let res = await apiAuth.get('/api/users');
				setUsers(res.data);
				console.log(res.data);
			} catch (err) {
				console.error(err);
			}
		})();
	}, [apiAuth]);

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this record ?')) {
			try {
				let deletedUser = await deleteUser(id);
				setUsers(users.filter((user) => user._id !== deletedUser._id));
			} catch (err) {
				console.error(err);
			}
		}
	};

	return (
		<>
			<div className='d-flex justify-content-between pt-3 pb-2 mb-3 border-bottom'>
				<h2>Users</h2>
			</div>
			{users.length ? (
				<div className='table-responsive'>
					<table className='table table-striped table-sm'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Id</th>
								<th scope='col'>First Name</th>
								<th scope='col'>Last Name</th>
								<th scope='col'>Email</th>
								<th scope='col'>Phone Number</th>
								<th scope='col'>Confirmed</th>
								<th scope='col'>Role</th>
								<th scope='col'>Created At</th>
								<th scope='col'>Updated At</th>
								<th scope='col'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user, idx) => {
								return (
									<tr key={user._id}>
										<td>{idx + 1}</td>
										<td>{user._id}</td>
										<td>{user.firstName}</td>
										<td>{user.lasName}</td>
										<td>{user.email}</td>
										<td>{user.phoneNo}</td>
										<td>
											{user.confirmed ? (
												<i
													class='fa-solid fa-check'
													style={{ color: 'green' }}
												></i>
											) : (
												<i
													class='fa-solid fa-xmark'
													style={{ color: 'red' }}
												></i>
											)}
										</td>
										<td>{user.systemRole?.name?.toUpperCase()}</td>
										<td>
											{user.createdAt
												? new Date(user.createdAt).toDateString()
												: '-'}
										</td>
										<td>
											{user.updatedAt
												? new Date(user.updatedAt).toDateString()
												: '-'}
										</td>
										<td>
											<button
												type='button'
												className={`btn btn-danger btn-sm mx-1 ${
													user._id === auth.id ? 'disabled' : ''
												}`}
												data-bs-toggle='tooltip'
												data-bs-placement='top'
												title='Delete'
												onClick={() => handleDelete(user._id)}
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
