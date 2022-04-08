const Search = () => {
	return (
		<div className='container d-flex justify-content-center align-items-center py-5 my-md-5'>
			<form className='row'>
				<div className='col-md-3 p-2'>
					<label htmlFor='from-select' className='form-label'>
						From <i className='fa-solid fa-location-dot'></i>
					</label>
					<select
						id='from-select'
						className='form-select form-select-lg'
						defaultValue={''}
					>
						<option value=''>Origin...</option>
						<option value='msa'>Mombasa</option>
						<option value='nrb'>Nairobi</option>
						<option value='ksm'>Kisumu</option>
					</select>
				</div>
				<div className='col-md-3 p-2'>
					<label htmlFor='to-select' className='form-label'>
						To <i className='fa-solid fa-location-dot'></i>
					</label>
					<select
						id='to-select'
						className='form-select form-select-lg'
						defaultValue={''}
					>
						<option value=''>Destination...</option>
						<option value='msa'>Mombasa</option>
						<option value='nrb'>Nairobi</option>
						<option value='ksm'>Kisumu</option>
					</select>
				</div>
				<div className='col-md-3 p-2'>
					<label htmlFor='date-input' className='form-label'>
						Departure Date <i className='fa-solid fa-calendar-days'></i>
					</label>
					<input
						type='date'
						className='form-control form-control-lg'
						id='date-input'
					/>
				</div>
				<div className='col-md-3 d-flex align-items-end p-2'>
					<button id='submit-button' className='btn btn-lg btn-dark w-100'>
						<i className='fa-solid fa-magnifying-glass'></i> Search
					</button>
				</div>
			</form>
		</div>
	);
};

export default Search;
