import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getEmployee, editEmployee } from '../../api';
import { EmployeeForm } from './EmployeeForm';

export const EditEmployee = () => {
	const [employeeData, setEmployeeData] = useState({});
	let navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			let res = await getEmployee(id);
			if (res.status === 200) {
				setEmployeeData(res.data);
			} else {
				console.log(res.data);
			}
		})();
	}, [id]);

	const handleSubmit = async (data) => {
		if (window.confirm('Are you sure you want to update this record ?')) {
			let updateData = _.pick(
				data,
				Object.keys(data).filter((k) => data[k] !== employeeData[k])
			); // get only the updated fields
			let res = await editEmployee(employeeData._id, updateData);
			if (res.status === 200) {
				navigate(-1);
			} else {
				console.log(res.data);
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
