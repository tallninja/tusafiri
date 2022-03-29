import React from 'react';

const SeatsSelect = ({ htmlId, handleSelect, journey }) => {
	return (
		<select
			id={htmlId}
			className='form-select'
			onChange={(e) => handleSelect(e.target.selectedOptions)}
			defaultValue={[]}
			multiple
			size={12}
		>
			{journey.bus?.seats.map((seat) => (
				<option key={seat._id} value={seat._id}>
					{seat.number}
				</option>
			))}
		</select>
	);
};

export default SeatsSelect;
