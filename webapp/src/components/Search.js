import { useState } from 'react';
import LocationsSelect from './LocationsSelect';

const Search = ({ handleSearch }) => {
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');
	const [date, setDate] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		handleSearch({
			from,
			to,
			date,
		});
	};

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
						handleSelect={(value) => setFrom(value)}
					/>
				</div>
				<div className='col-md-3 p-2'>
					<label htmlFor='to-select' className='form-label'>
						To <i className='fa-solid fa-location-dot'></i>
					</label>
					<LocationsSelect
						id='to-select'
						placeholder='Destination...'
						handleSelect={(value) => setTo(value)}
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
						onChange={(e) => setDate(e.target.value)}
					/>
				</div>
				<div className='col-md-3 d-flex align-items-end p-2'>
					<button id='submit-button' className='btn btn-lg btn-primary w-100'>
						<i className='fa-solid fa-magnifying-glass'></i> Search
					</button>
				</div>
			</form>
		</div>
	);
};

export default Search;
