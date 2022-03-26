import React, { useState, useEffect } from 'react';

export const LocationForm = ({ onSubmit, initialValues, action }) => {
	const [locationData, setLocationData] = useState({
		name: '',
		code: '',
		lat: null,
		lng: null,
	});

	useEffect(() => {
		if (initialValues) {
			setLocationData(initialValues);
		}
	}, [initialValues]);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(locationData);
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
					defaultValue={locationData.name}
					type={'text'}
					className='form-control'
					id='inputEmail4'
					placeholder='Nairobi'
					onChange={(e) =>
						setLocationData({ ...locationData, name: e.target.value })
					}
				/>
			</div>
			<div className='col-md-4'>
				<label htmlFor='inputPassword4' className='form-label'>
					Code
				</label>
				<input
					defaultValue={locationData.code}
					type={'text'}
					className='form-control'
					id='inputPassword4'
					placeholder='NRB'
					onChange={(e) =>
						setLocationData({ ...locationData, code: e.target.value })
					}
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
					defaultValue={locationData.lat}
					type={'text'}
					className='form-control'
					id='inputCity'
					placeholder='-1.281924462106501'
					onChange={(e) =>
						setLocationData({
							...locationData,
							lat: parseFloat(e.target.value),
						})
					}
				/>
			</div>
			<div className='col-md-6'>
				<label htmlFor='inputState' className='form-label'>
					Longitude
				</label>
				<input
					defaultValue={locationData.lng}
					type={'text'}
					className='form-control'
					id='inputCity'
					placeholder='36.81030448514034'
					onChange={(e) =>
						setLocationData({
							...locationData,
							lng: parseFloat(e.target.value),
						})
					}
				/>
			</div>
			<div className='d-grid'>
				<button type='submit' className='btn btn-dark mt-4'>
					{action}
				</button>
			</div>
		</form>
	);
};
