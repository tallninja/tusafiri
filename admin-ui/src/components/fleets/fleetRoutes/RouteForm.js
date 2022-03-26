/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const RouteForm = ({ onSubmit, initialValues, action }) => {
	const [routeData, setRouteData] = useState({
		name: '',
		from: '',
		to: '',
	});

	const navigate = useNavigate();

	useEffect(() => {
		if (initialValues) {
			setRouteData(initialValues);
		}
	}, [initialValues]);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(routeData);
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
					defaultValue={routeData.name}
					type={'text'}
					className='form-control'
					id='nameInput'
					placeholder='A1'
					onChange={(e) => setRouteData({ ...routeData, name: e.target.value })}
				/>
			</div>
			<h4>Locations</h4>
			<hr />
			<div className='col-md-6'>
				<label htmlFor='fromInput' className='form-label'>
					From
				</label>
				<input
					defaultValue={routeData.from}
					type={'fromInput'}
					className='form-control'
					id='fromInput'
					placeholder='MSA'
					onChange={(e) =>
						setRouteData({
							...routeData,
							from: e.target.value,
						})
					}
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
					defaultValue={routeData.to}
					type={'text'}
					className='form-control'
					id='toInput'
					placeholder='NRB'
					onChange={(e) =>
						setRouteData({
							...routeData,
							to: e.target.value,
						})
					}
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
