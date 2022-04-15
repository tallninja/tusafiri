/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const BusForm = ({ onSubmit, initialValues, action }) => {
	const [regNo, setRegNo] = useState('');
	const [make, setMake] = useState('');
	const [yom, setYom] = useState('');
	const [capacity, setCapacity] = useState();

	const navigate = useNavigate();

	useEffect(() => {
		if (initialValues) {
			setRegNo(initialValues?.regNo);
			setMake(initialValues?.make);
			setYom(initialValues?.yom);
			setCapacity(initialValues?.capacity);
		}
	}, [initialValues]);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({
			regNo,
			make,
			yom,
			capacity,
		});
	};

	return (
		<form className='row g-3 mt-4' onSubmit={handleSubmit}>
			<h3>{action} Bus</h3>
			<hr />
			<div className='col-md-12'>
				<label htmlFor='regNoInput' className='form-label'>
					Registration Number
				</label>
				<input
					id='regNoInput'
					className='form-control'
					placeholder='KBM 960X'
					type={'text'}
					defaultValue={regNo}
					onChange={(e) => setRegNo(e.target.value)}
				/>
			</div>
			<div className='col-md-12'>
				<label htmlFor='makeInput' className='form-label'>
					Make
				</label>
				<input
					id='makeInput'
					className='form-control'
					placeholder='Scania'
					type={'text'}
					defaultValue={make}
					onChange={(e) => setMake(e.target.value)}
				/>
			</div>
			<div className='col-md-12'>
				<label htmlFor='yomInput' className='form-label'>
					Year of manufacture
				</label>
				<input
					id='yomInput'
					className='form-control'
					placeholder='2010'
					type={'number'}
					min={2005}
					max={new Date().getFullYear()}
					defaultValue={yom}
					onChange={(e) => setYom(e.target.value)}
				/>
				<div className='form-text'>
					Must be between 2005 and {new Date().getFullYear()}.
				</div>
			</div>
			<div className='col-md-12'>
				<label htmlFor='capacityInput' className='form-label'>
					Capacity
				</label>
				<input
					id='capacityInput'
					className='form-control'
					placeholder='20'
					type={'number'}
					min={5}
					max={100}
					defaultValue={capacity}
					onChange={(e) => setCapacity(e.target.value)}
				/>
				<div className='form-text'>Must be between 5 and 100.</div>
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
