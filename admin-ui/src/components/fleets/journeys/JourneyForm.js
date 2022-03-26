/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const JourneyForm = ({ onSubmit, initialValues, action }) => {
	const [journeyData, setJourneyData] = useState({
		bus: '',
		route: '',
		fare: null,
		departureTime: null,
		arrivalTime: null,
	});

	const navigate = useNavigate();

	useEffect(() => {
		if (initialValues) {
			setJourneyData(initialValues);
		}
	}, [initialValues]);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(journeyData);
	};

	return (
		<form className='row g-3 mt-4' onSubmit={handleSubmit}>
			<h3>{action} Journey</h3>
			<hr />
			<div className='col-md-12'>
				<label htmlFor='busInput' className='form-label'>
					Bus
				</label>
				<input
					id='busInput'
					className='form-control'
					placeholder='KBM 960X'
					type={'text'}
					defaultValue={journeyData.bus}
					onChange={(e) =>
						setJourneyData({ ...journeyData, bus: e.target.value })
					}
				/>
				<div className='form-text'>Registration number of the bus.</div>
			</div>
			<div className='col-md-12'>
				<label htmlFor='routeInput' className='form-label'>
					Route
				</label>
				<input
					id='routeInput'
					className='form-control'
					type={'text'}
					placeholder='A1'
					defaultValue={journeyData.route}
					onChange={(e) =>
						setJourneyData({ ...journeyData, route: e.target.value })
					}
				/>
				<div className='form-text'>Code representing the route.</div>
			</div>
			<div className='col-md-12'>
				<label htmlFor='fareInput' className='form-label'>
					Fare
				</label>
				<input
					id='fareInput'
					className='form-control'
					type={'number'}
					min={50}
					max={5000}
					placeholder='1100'
					defaultValue={journeyData.fare}
					onChange={(e) =>
						setJourneyData({ ...journeyData, fare: e.target.value })
					}
				/>
				<div className='form-text'>Fare per person in Ksh.</div>
			</div>
			<h4>Dates</h4>
			<hr />
			<div className='col-md-6'>
				<label htmlFor='departureInput' className='form-label'>
					Departure
				</label>
				<input
					id='departureInput'
					className='form-control'
					type={'datetime-local'}
					min={new Date().toISOString().split(':').slice(0, 2).join(':')}
					defaultValue={journeyData.departureTime}
					onChange={(e) =>
						setJourneyData({ ...journeyData, departureTime: e.target.value })
					}
				/>
				<div className='form-text'>Date and time of departure.</div>
			</div>
			<div className='col-md-6'>
				<label htmlFor='arrivalInput' className='form-label'>
					Arrival
				</label>
				<input
					id='arrivalInput'
					className='form-control'
					type={'datetime-local'}
					min={new Date().toISOString().split(':').slice(0, 2).join(':')}
					defaultValue={journeyData.arrivalTime}
					onChange={(e) =>
						setJourneyData({ ...journeyData, arrivalTime: e.target.value })
					}
				/>
				<div className='form-text'>Date and time of arrival.</div>
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
