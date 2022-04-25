import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import LocationsSelect from './LocationsSelect';
import { getLocations } from '../api';

const Search = ({ defaultValues }) => {
	const [locations, setLocations] = useState([]);
	const [from, setFrom] = useState(defaultValues?.from || '');
	const [to, setTo] = useState(defaultValues?.to || '');
	const [date, setDate] = useState(defaultValues?.date || '');

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/search?from=${from}&to=${to}&date=${date}`);
	};

	useEffect(() => {
		(async () => {
			try {
				const locations = await getLocations();
				setLocations(locations);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		})();
	}, [defaultValues]);

	return (
		<div className='container d-flex justify-content-center align-items-center py-5 my-3'>
			<form className='row' onSubmit={handleSubmit}>
				<div className='col-md-3 p-2'>
					<label htmlFor='from-select' className='form-label'>
						From <i className='fa-solid fa-location-dot'></i>
					</label>
					<LocationsSelect
						id='from-select'
						placeholder='Origin...'
						locations={locations}
						handleSelect={(value) => setFrom(value)}
						defaultValue={from}
					/>
				</div>
				<div className='col-md-3 p-2'>
					<label htmlFor='to-select' className='form-label'>
						To <i className='fa-solid fa-location-dot'></i>
					</label>
					<LocationsSelect
						id='to-select'
						placeholder='Destination...'
						locations={locations}
						handleSelect={(value) => setTo(value)}
						defaultValue={to}
					/>
				</div>
				<div className='col-md-3 p-2'>
					<label htmlFor='date-input' className='form-label'>
						Departure Date <i className='fa-solid fa-calendar-days'></i>
					</label>
					<input
						type='date'
						className='form-control form-control-lg'
						id='date-input'
						min={new Date().toISOString().split('T')[0]}
						onChange={(e) => setDate(e.target.value)}
						defaultValue={date}
					/>
				</div>
				<div className='col-md-3 d-flex align-items-end p-2'>
					<button
						id='submit-button'
						type='submit'
						className='btn btn-lg btn-primary w-100'
					>
						<i className='fa-solid fa-magnifying-glass'></i> Search
					</button>
				</div>
			</form>
		</div>
	);
};

export default Search;
