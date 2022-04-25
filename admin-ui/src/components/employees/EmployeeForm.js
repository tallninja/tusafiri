/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const EmployeeForm = ({ onSubmit, initialValues, action }) => {
	const [employeeData, setEmployeeData] = useState({
		employeeId: '',
		firstName: '',
		lastName: '',
		idNo: '',
		email: '',
		phoneNumber: '',
	});

	const navigate = useNavigate();

	let { role } = useParams();

	useEffect(() => {
		const ROLES = {
			drivers: 'drivers',
			fleetManagers: 'fleet-managers',
			snmManagers: 'snm-managers',
			helpDesk: 'help-desk',
		};

		switch (role) {
			case ROLES.drivers:
				setEmployeeData((data) => ({ ...data, role: 'driver' }));
				break;

			case ROLES.fleetManagers:
				setEmployeeData((data) => ({ ...data, role: 'fleet-manager' }));
				break;

			case ROLES.snmManagers:
				setEmployeeData((data) => ({ ...data, role: 'snm-manager' }));
				break;

			case ROLES.helpDesk:
				setEmployeeData((data) => ({ ...data, role: 'help-desk' }));
				break;

			default:
				break;
		}

		if (initialValues) {
			setEmployeeData({ ...initialValues });
		}
	}, [initialValues, role]);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(employeeData);
	};

	return (
		<form className='row g-3 mt-4' onSubmit={handleSubmit}>
			<h3>{action} Employee</h3>
			<hr />
			<div className='col-md-12'>
				<label htmlFor='employeeIdInput' className='form-label'>
					Employee ID
				</label>
				<input
					id='employeeIdInput'
					className='form-control'
					placeholder='DRV0001/2018'
					type={'text'}
					defaultValue={employeeData.employeeId}
					onChange={(e) =>
						setEmployeeData({ ...employeeData, employeeId: e.target.value })
					}
				/>
				<div className='form-text'>
					ID format: {'<dept><id>/<year of employment>'}. Drivers: DRV, Fleet
					Managers: FLT, Service and Maintenance: SNM, Help Desk: HDS
				</div>
			</div>
			<div className='col-md-6'>
				<label htmlFor='firstNameInput' className='form-label'>
					First Name
				</label>
				<input
					id='firstNameInput'
					className='form-control'
					type={'text'}
					placeholder='John'
					defaultValue={employeeData.firstName}
					onChange={(e) =>
						setEmployeeData({ ...employeeData, firstName: e.target.value })
					}
				/>
			</div>
			<div className='col-md-6'>
				<label htmlFor='lastNameInput' className='form-label'>
					Last Name
				</label>
				<input
					id='lastNameInput'
					className='form-control'
					type={'text'}
					placeholder='Doe'
					defaultValue={employeeData.lastName}
					onChange={(e) =>
						setEmployeeData({ ...employeeData, lastName: e.target.value })
					}
				/>
			</div>
			<div className='col-md-12'>
				<label htmlFor='idNoInput' className='form-label'>
					ID Number
				</label>
				<input
					id='idNoInput'
					className='form-control'
					type={'text'}
					placeholder='10818289'
					defaultValue={employeeData.idNo}
					onChange={(e) =>
						setEmployeeData({ ...employeeData, idNo: parseInt(e.target.value) })
					}
				/>
			</div>
			<div className='col-md-6'>
				<label htmlFor='emailInput' className='form-label'>
					Email
				</label>
				<input
					id='emailInput'
					className='form-control'
					type={'email'}
					placeholder='johndoe@example.com'
					defaultValue={employeeData.email}
					onChange={(e) =>
						setEmployeeData({ ...employeeData, email: e.target.value })
					}
				/>
			</div>
			<div className='col-md-6'>
				<label htmlFor='phoneNumberInput' className='form-label'>
					Phone Number
				</label>
				<input
					id='phoneNumberInput'
					className='form-control'
					type={'text'}
					placeholder='+254...'
					defaultValue={employeeData.phoneNumber}
					onChange={(e) =>
						setEmployeeData({ ...employeeData, phoneNumber: e.target.value })
					}
				/>
			</div>
			<div className='d-flex justify-content-between my-3 '>
				<a
					className='btn btn-info btn-lg frac-width'
					role={'button'}
					onClick={() => navigate(-1)}
				>
					Cancel
				</a>
				<button className='btn btn-dark btn-lg frac-width' type='submit'>
					{action}
				</button>
			</div>
		</form>
	);
};
