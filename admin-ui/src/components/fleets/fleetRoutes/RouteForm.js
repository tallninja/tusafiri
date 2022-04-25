/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getLocations } from '../../../api';
import LocationSelect from './LocationSelect';

export const RouteForm = ({ onSubmit, initialValues, action }) => {
	const [name, setName] = useState('');
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');
	const [locations, setLocations] = useState();

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const res = await getLocations();
				setLocations(res.data);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		})();
	}, []);

	useEffect(() => {
		if (initialValues) {
			setName(initialValues?.name);
			setFrom(initialValues?.from);
			setTo(initialValues?.to);
		}
	}, [initialValues]);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ name, from, to });
	};

	return (
		<form className='row g-3 mt-4' onSubmit={handleSubmit}>
			<h3>{action} Route</h3>
			<hr />
			<div className='col-md-12'>
				<label htmlFor='nameInput' className='form-label'>
					Name
				</label>
				<input
					defaultValue={name}
					type={'text'}
					className='form-control'
					id='nameInput'
					placeholder='A1'
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<h4>Locations</h4>
			<hr />
			<div className='col-md-6'>
				<label htmlFor='fromInput' className='form-label'>
					From
				</label>
				<LocationSelect
					id='toSelect'
					locations={locations}
					defaultValue={to}
					handleSelect={(value) => setTo(value)}
				/>
				<div className='form-text'>
					3 letter code representing the location.
				</div>
			</div>
			<div className='col-md-6'>
				<label htmlFor='fromSelect' className='form-label'>
					To
				</label>
				<LocationSelect
					id='fromSelect'
					locations={locations}
					defaultValue={from}
					handleSelect={(value) => setFrom(value)}
				/>
				<div className='form-text'>
					3 letter code representing the location.
				</div>
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
