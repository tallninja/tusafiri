import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
	getDrivers,
	getFleetManagers,
	getSnmManagers,
	getHelpDesk,
	deleteEmployee,
} from '../../api';

import NoResults from '../NoResults';

export const Employees = () => {
	const [employees, setEmployees] = useState([]);
	const navigate = useNavigate();

	const { role } = useParams();

	useEffect(() => {
		(async () => {
			const ROLES = {
				drivers: 'drivers',
				fleetManagers: 'fleet-managers',
				snmManagers: 'snm-managers',
				helpDesk: 'help-desk',
			};

			const getEmployees = async () => {
				switch (role) {
					case ROLES.drivers:
						return await getDrivers();

					case ROLES.fleetManagers:
						return await getFleetManagers();

					case ROLES.snmManagers:
						return await getSnmManagers();

					case ROLES.helpDesk:
						return await getHelpDesk();

					default:
						break;
				}
			};

			let res = await getEmployees();
			if (res.status === 200) {
				setEmployees(res.data);
			} else {
				console.log(res.data);
			}
		})();
	}, [role]);

	const handleEdit = (id) => {
		navigate(`/employees/${role}/edit/${id}`);
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this record ?')) {
			let res = await deleteEmployee(id);
			if (res.status === 200) {
				setEmployees(
					employees.filter((employee) => employee._id !== res.data._id)
				);
			} else {
				console.log(res.data);
			}
		}
	};

	return (
		<>
			<div className='d-flex justify-content-between pt-3 pb-2 mb-3 border-bottom'>
				<h2 style={{ textTransform: 'capitalize' }}>{role}</h2>
				<div>
					<Link
						to={`/employees/${role}/new`}
						className='btn btn-success'
						role={'button'}
					>
						Add
					</Link>
				</div>
			</div>
			{employees.length ? (
				<div className='table-responsive-xl'>
					<table className='table table-striped table-sm'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Employee ID</th>
								<th scope='col'>Role</th>
								<th scope='col'>First Name</th>
								<th scope='col'>Last Name</th>
								<th scope='col'>ID No</th>
								<th scope='col'>Email</th>
								<th scope='col'>Phone No</th>
								<th scope='col'>Created At</th>
								<th scope='col'>Updated At</th>
								<th scope='col'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{employees.map((employee, idx) => {
								return (
									<tr key={employee._id}>
										<td>{idx + 1}</td>
										<td>{employee.employeeId}</td>
										<td>{employee.role?.name || '-'}</td>
										<td>{employee.firstName}</td>
										<td>{employee.lastName}</td>
										<td>{employee.idNo}</td>
										<td>{employee.email}</td>
										<td>{employee.phoneNumber}</td>
										<td>
											{employee.createdAt
												? new Date(employee.createdAt).toDateString()
												: '-'}
										</td>
										<td>
											{employee.updatedAt
												? new Date(employee.updatedAt).toDateString()
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
												onClick={() => handleEdit(employee._id)}
											>
												<i className='fa-solid fa-pen-to-square'></i>
											</button>
											<button
												type='button'
												className='btn btn-danger btn-sm mx-1'
												data-bs-toggle='tooltip'
												data-bs-placement='top'
												title='Delete'
												onClick={() => handleDelete(employee._id)}
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
