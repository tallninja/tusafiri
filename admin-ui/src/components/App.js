import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import './App.css';
import AppWrapper from './AppWrapper';
import { Dashboard } from './Dashboard';
import { FleetRoutes, CreateRoute, EditRoute } from './fleets/fleetRoutes';
import { Locations, CreateLocation, EditLocation } from './fleets/locations';
import { Buses, CreateBus, EditBus } from './fleets/buses';
import { Journeys, CreateJourney, EditJourney } from './fleets/journeys';
import { Employees, CreateEmployee, EditEmployee } from './employees';
import { Bookings, CreateBooking, Invoices } from './bookings';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Routes>
				<Route path='/' element={<AppWrapper />}>
					<Route index element={<Dashboard />} />

					<Route path='fleets'>
						<Route path='locations'>
							<Route index element={<Locations />} />
							<Route path='new' element={<CreateLocation />} />
							<Route path='edit/:id' element={<EditLocation />} />
						</Route>

						<Route path='routes'>
							<Route index element={<FleetRoutes />} />
							<Route path='new' element={<CreateRoute />} />
							<Route path='edit/:id' element={<EditRoute />} />
						</Route>

						<Route path='buses'>
							<Route index element={<Buses />} />
							<Route path='new' element={<CreateBus />} />
							<Route path='edit/:id' element={<EditBus />} />
						</Route>

						<Route path='journeys'>
							<Route index element={<Journeys />} />
							<Route path='new' element={<CreateJourney />} />
							<Route path='edit/:id' element={<EditJourney />} />
						</Route>
					</Route>

					<Route path='employees'>
						<Route path=':role' element={<Employees />} />
						<Route path=':role/new' element={<CreateEmployee />} />
						<Route path=':role/edit/:id' element={<EditEmployee />} />
					</Route>

					<Route path='bookings'>
						<Route index element={<Bookings />} />
						<Route path='new' element={<CreateBooking />} />
					</Route>

					<Route path='invoices'>
						<Route index element={<Invoices />} />
					</Route>
				</Route>
			</Routes>
		</QueryClientProvider>
	);
};

export default App;
