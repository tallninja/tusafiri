/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LocationForm = ({ onSubmit, initialValues, action }) => {
	const [name, setName] = useState('');
	const [code, setCode] = useState('');
	const [lat, setLat] = useState();
	const [lng, setLng] = useState();

	const navigate = useNavigate();

	useEffect(() => {
		if (initialValues) {
			setName(initialValues?.name);
			setCode(initialValues?.code);
			setLat(initialValues?.lat);
			setLng(initialValues?.lng);
		}
	}, [initialValues]);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ name, code, lat, lng });
	};

	return (
		<form className='row g-3 mt-4' onSubmit={handleSubmit}>
			<h3>{action} Location</h3>
			<hr />
			<div className='col-md-8'>
				<label htmlFor='inputEmail4' className='form-label'>
					Name
				</label>
				<input
					defaultValue={name}
					type={'text'}
					className='form-control'
					id='inputEmail4'
					placeholder='Nairobi'
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className='col-md-4'>
				<label htmlFor='inputPassword4' className='form-label'>
					Code
				</label>
				<input
					defaultValue={code}
					type={'text'}
					className='form-control'
					id='inputPassword4'
					placeholder='NRB'
					onChange={(e) => setCode(e.target.value)}
				/>
				<div className='form-text'>
					3 letter code representing the location.
				</div>
			</div>
			<h4>Co-ordinates</h4>
			<hr />
			<div className='col-md-6'>
				<label htmlFor='inputCity' className='form-label'>
					Latitude
				</label>
				<input
					defaultValue={lat}
					type={'text'}
					className='form-control'
					id='inputCity'
					placeholder='-1.281924462106501'
					onChange={(e) => setLat(parseFloat(e.target.value))}
				/>
			</div>
			<div className='col-md-6'>
				<label htmlFor='inputState' className='form-label'>
					Longitude
				</label>
				<input
					defaultValue={lng}
					type={'text'}
					className='form-control'
					id='inputCity'
					placeholder='36.81030448514034'
					onChange={(e) => setLng(parseFloat(e.target.value))}
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
