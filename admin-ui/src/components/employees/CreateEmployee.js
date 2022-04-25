import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createEmployee } from '../../api';
import { EmployeeForm } from './EmployeeForm';

export const CreateEmployee = () => {
	const navigate = useNavigate();

	const handleSubmit = async (employeeData) => {
		if (window.confirm('Are you sure you want to add this record ?')) {
			try {
				let res = await createEmployee(employeeData);
				toast.success(`${res.data.employeeId} was added.`);
				navigate(-1);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		}
	};

	return <EmployeeForm onSubmit={handleSubmit} action='Save' />;
};
