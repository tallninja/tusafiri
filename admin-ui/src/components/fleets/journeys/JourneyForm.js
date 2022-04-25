/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import DriverSelect from './DriverSelect';
import BusSelect from './BusSelect';
import RouteSelect from './RouteSelect';

import { getDrivers } from '../../../api';

export const JourneyForm = ({ onSubmit, initialValues, action }) => {
	const [bus, setBus] = useState('');
	const [route, setRoute] = useState('');
	const [fare, setFare] = useState('');
	const [departureTime, setDepartureTime] = useState('');
	const [arrivalTime, setarrivalTime] = useState('');
	const [driver1, setDriver1] = useState('');
	const [driver2, setDriver2] = useState('');
	const [fetchedDrivers, setFetchedDrivers] = useState([]);

	useEffect(() => {
		if (initialValues?._id) {
			setBus(initialValues.bus);
			setRoute(initialValues.route);
			setFare(initialValues.fare);
			setDepartureTime(initialValues.departureTime);
			setarrivalTime(initialValues.arrivalTime);
			setDriver1(initialValues.drivers[0]);
			setDriver2(initialValues.drivers[1]);
		}
	}, [initialValues]);

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const res = await getDrivers();
				setFetchedDrivers(res.data);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		})();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({
			bus,
			route,
			fare,
			departureTime,
			arrivalTime,
			drivers: [driver1, driver2],
		});
	};

	return (
		<form className='row g-3 mt-4' onSubmit={handleSubmit}>
			<h3>{action} Journey</h3>
			<hr />
			<div className='col-md-12'>
				<label htmlFor='busSelect' className='form-label'>
					Bus
				</label>
				<BusSelect
					id='busSelect'
					handleSelect={(value) => setBus(value)}
					defaultValue={bus || ''}
				/>
				<div className='form-text'>Registration number of the bus.</div>
			</div>
			<div className='col-md-12'>
				<label htmlFor='routeInput' className='form-label'>
					Route
				</label>
				<RouteSelect
					id='routeSelect'
					handleSelect={(value) => setRoute(value)}
					defaultValue={route || ''}
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
					defaultValue={fare}
					onChange={(e) => setFare(e.target.value)}
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
					defaultValue={departureTime}
					onChange={(e) => setDepartureTime(e.target.value)}
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
					defaultValue={arrivalTime}
					onChange={(e) => setarrivalTime(e.target.value)}
				/>
				<div className='form-text'>ETA - Estimated Time of Arrival.</div>
			</div>

			<h4>Drivers</h4>
			<hr />
			<div className='col-md-6'>
				<label htmlFor='driver1Select' className='form-label'>
					1<sup>st</sup> Driver
				</label>
				<DriverSelect
					id='driver1Select'
					drivers={fetchedDrivers}
					handleSelect={(value) => setDriver1(value)}
					defaultValue={driver1}
				/>
			</div>

			<div className='col-md-6'>
				<label htmlFor='driver2Select' className='form-label'>
					2<sup>nd</sup> driver
				</label>
				<DriverSelect
					id='driver2Select'
					drivers={fetchedDrivers}
					handleSelect={(value) => setDriver2(value)}
					defaultValue={driver2}
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
