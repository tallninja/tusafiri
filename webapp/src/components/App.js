import { Routes, Route } from 'react-router-dom';

import './index.css';
import AppWrapper from './AppWrapper';
import LandingPage from './LandingPage';
import PageNotFound from './PageNotFound';
import Home from './Home';
import Login from './Login';
import SearchResults from './SearchResults';
import ProtectedRoute from './ProtectedRoute';
import PersistLogin from './PersistLogin';
import Signup from './Signup';
import Invoice from './Invoice';
import Booking from './Booking';
import Journey from './Journey';
import Tickets from './Tickets';
import TicketView from './TicketView';
import UserBookings from './UserBookings';
import UserInvoices from './UserInvoices';

const App = () => {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Signup />} />
			<Route element={<PersistLogin />}>
				<Route path='/' element={<AppWrapper />}>
					<Route index element={<LandingPage />} />
					<Route path='/home' element={<Home />} />
					<Route path='search' element={<SearchResults />} />
					<Route path='journeys/:id' element={<Journey />} />
					<Route path='user' element={<ProtectedRoute />}>
						<Route path='booking'>
							<Route index element={<Booking />} />
						</Route>

						<Route path='bookings'>
							<Route index element={<UserBookings />} />
						</Route>

						<Route path='invoices'>
							<Route index element={<UserInvoices />} />
							<Route path=':booking' element={<Invoice />} />
						</Route>

						<Route path='tickets/:booking' element={<Tickets />} />
					</Route>
					<Route path='/*' element={<PageNotFound />} />
					<Route path='/tickets/:id' element={<TicketView />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default App;
