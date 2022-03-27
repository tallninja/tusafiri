import React from 'react';
import { useNavigate } from 'react-router-dom';

import { createEmployee } from '../../api';
import { EmployeeForm } from './EmployeeForm';

export const CreateEmployee = () => {
	const navigate = useNavigate();

	const handleSubmit = async (employeeData) => {
		if (window.confirm('Are you sure you want to add this record ?')) {
			let res = await createEmployee(employeeData);
			if (res.status === 200) {
				navigate(-1);
			} else {
				console.log(res.data);
			}
		}
	};

	return <EmployeeForm onSubmit={handleSubmit} action='Save' />;
};
