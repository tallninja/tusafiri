/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const RouteForm = ({ onSubmit, initialValues, action }) => {
	const [name, setName] = useState('');
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');

	const navigate = useNavigate();

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
				<input
					defaultValue={from}
					type={'fromInput'}
					className='form-control'
					id='fromInput'
					placeholder='MSA'
					onChange={(e) => setFrom(e.target.value)}
				/>
				<div className='form-text'>
					3 letter code representing the location.
				</div>
			</div>
			<div className='col-md-6'>
				<label htmlFor='toInput' className='form-label'>
					To
				</label>
				<input
					defaultValue={to}
					type={'text'}
					className='form-control'
					id='toInput'
					placeholder='NRB'
					onChange={(e) => setTo(e.target.value)}
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
