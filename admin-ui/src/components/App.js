import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import './App.css';
import { AppWrapper } from './AppWrapper';
import { Dashboard } from './Dashboard';
import { JourneyRoute, Bus, Journey } from './fleets';
import { Locations, CreateLocation, EditLocation } from './fleets/locations';
// import { Login } from './Login';

import { Products } from './Products';

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
						<Route path='/fleets/routes' element={<JourneyRoute />} />
						<Route path='/fleets/buses' element={<Bus />} />
						<Route path='/fleets/journeys' element={<Journey />} />
						<Route path='/products' element={<Products />} />
					</Routes>
				</AppWrapper>
			</BrowserRouter>
		</QueryClientProvider>
	);
};
