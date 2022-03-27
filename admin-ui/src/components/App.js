import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import './App.css';
import { AppWrapper } from './AppWrapper';
import { Dashboard } from './Dashboard';
import { FleetRoutes, CreateRoute, EditRoute } from './fleets/fleetRoutes';
import { Locations, CreateLocation, EditLocation } from './fleets/locations';
import { Buses, CreateBus, EditBus } from './fleets/buses';
import { Journeys, CreateJourney, EditJourney } from './fleets/journeys';
import { Employees, CreateEmployee, EditEmployee } from './employees';

const queryClient = new QueryClient();

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AppWrapper>
					<Routes>
						<Route path='/' element={<Dashboard />} />

						<Route path='/fleets/locations' element={<Locations />} />
						<Route path='/fleets/locations/new' element={<CreateLocation />} />
						<Route
							path='/fleets/locations/edit/:id'
							element={<EditLocation />}
						/>

						<Route path='/fleets/routes' element={<FleetRoutes />} />
						<Route path='/fleets/routes/new' element={<CreateRoute />} />
						<Route path='/fleets/routes/edit/:id' element={<EditRoute />} />

						<Route path='/fleets/buses' element={<Buses />} />
						<Route path='/fleets/buses/new' element={<CreateBus />} />
						<Route path='/fleets/buses/edit/:id' element={<EditBus />} />

						<Route path='/fleets/journeys' element={<Journeys />} />
						<Route path='/fleets/journeys/new' element={<CreateJourney />} />
						<Route path='/fleets/journeys/edit/:id' element={<EditJourney />} />

						<Route path='/employees/:role' element={<Employees />} />
						<Route path='/employees/:role/new' element={<CreateEmployee />} />
						<Route
							path='/employees/:role/edit/:id'
							element={<EditEmployee />}
						/>
					</Routes>
				</AppWrapper>
			</BrowserRouter>
		</QueryClientProvider>
	);
};
