/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getJourneys, getJourney } from '../../api';
import JourneySelect from './JourneySelect';
import SeatsSelect from './SeatsSelect';

export const BookingForm = ({ onSubmit, initialValues, action }) => {
	const [bookingData, setBookingData] = useState({
		journey: '',
		seats: [],
	});

	const [journeys, setJourneys] = useState([]);

	const [selectedJourney, setSelectedJourney] = useState({});

	const navigate = useNavigate();

	useEffect(() => {
		if (initialValues) {
			setBookingData(initialValues);
		}
	}, [initialValues]);

	useEffect(() => {
		(async () => {
			try {
				const res = await getJourneys();
				setJourneys(res.data);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const res = await getJourney(bookingData.journey);
				setSelectedJourney(res.data);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		})();
	}, [bookingData.journey]);

	const handleSelectedSeats = (selectedOptions) => {
		let selectedSeats = [];

		for (let option of selectedOptions) {
			selectedSeats.push(option.value);
		}

		setBookingData({
			...bookingData,
			seats: selectedSeats,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(bookingData);
	};

	return (
		<form className='row g-3 mt-4' onSubmit={handleSubmit}>
			<h3>{action} Booking</h3>
			<hr />
			<div className='col-md-12'>
				<label htmlFor='journeySelect' className='form-label'>
					Journey
				</label>
				<JourneySelect
					htmlId='journeySelect'
					journeys={journeys}
					handleSelect={(value) => {
						setBookingData({
							...bookingData,
							journey: value,
						});
					}}
				/>
			</div>

			<div className='col-md-12'>
				<label htmlFor='seatsSelect' className='form-label'>
					Seats
				</label>
				<SeatsSelect
					htmlId='seatsSelect'
					journey={selectedJourney}
					handleSelect={handleSelectedSeats}
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
