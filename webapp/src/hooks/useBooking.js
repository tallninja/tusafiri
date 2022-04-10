import { useContext } from 'react';

import { BookingContext } from '../context/BookingProvider';

const useBooking = () => {
	return useContext(BookingContext);
};

export default useBooking;
