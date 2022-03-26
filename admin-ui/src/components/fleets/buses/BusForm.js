/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const BusForm = ({ onSubmit, initialValues, action }) => {
	const [busData, setBusData] = useState({
		regNo: '',
		make: '',
		yom: null,
		capacity: null,
	});

	const navigate = useNavigate();

	useEffect(() => {
		if (initialValues) {
			setBusData(initialValues);
		}
	}, [initialValues]);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(busData);
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
					defaultValue={busData.regNo}
					onChange={(e) => setBusData({ ...busData, regNo: e.target.value })}
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
					defaultValue={busData.make}
					onChange={(e) => setBusData({ ...busData, make: e.target.value })}
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
					defaultValue={busData.yom}
					onChange={(e) => setBusData({ ...busData, yom: e.target.value })}
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
					min={10}
					max={60}
					defaultValue={busData.capacity}
					onChange={(e) => setBusData({ ...busData, capacity: e.target.value })}
				/>
				<div className='form-text'>Must be between 10 and 60.</div>
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
