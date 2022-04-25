/* eslint-disable no-unused-vars */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import $ from 'jquery';
import Popper from 'popper.js';

import BookingProvider from './context/BookingProvider';
import AuthProvider from './context/AuthProvider';
import App from './components/App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<Router>
		<AuthProvider>
			<BookingProvider>
				<Routes>
					<Route path='/*' element={<App />} />
				</Routes>
			</BookingProvider>
		</AuthProvider>
	</Router>
);
