import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getEmployee, editEmployee } from '../../api';
import { EmployeeForm } from './EmployeeForm';

export const EditEmployee = () => {
	const [employeeData, setEmployeeData] = useState({});
	let navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			try {
				const res = await getEmployee(id);
				setEmployeeData(res.data);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		})();
	}, [id]);

	const handleSubmit = async (data) => {
		if (window.confirm('Are you sure you want to update this record ?')) {
			let updateData = _.pick(
				data,
				Object.keys(data).filter((k) => data[k] !== employeeData[k])
			); // get only the updated fields
			try {
				const res = await editEmployee(employeeData._id, updateData);
				toast.success(`${res.data.employeeId} was updated`);
				navigate(-1);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		}
	};

	return (
		<EmployeeForm
			onSubmit={handleSubmit}
			initialValues={employeeData}
			action='Update'
		/>
	);
};
