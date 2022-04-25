import { useState, createContext } from 'react';

export const BookingContext = createContext({});

const BookingProvider = ({ children }) => {
	const [booking, setBooking] = useState({});

	return (
		<BookingContext.Provider value={{ booking, setBooking }}>
			{children}
		</BookingContext.Provider>
	);
};

export default BookingProvider;
