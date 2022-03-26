import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import './App.css';
import { AppWrapper } from './AppWrapper';
import { Dashboard } from './Dashboard';
import { FleetRoutes, CreateRoute, EditRoute } from './fleets/fleetRoutes';
import { Locations, CreateLocation, EditLocation } from './fleets/locations';

const queryClient = new QueryClient();

export const App = (props) => {
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
					</Routes>
				</AppWrapper>
			</BrowserRouter>
		</QueryClientProvider>
	);
};
