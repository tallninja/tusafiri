import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import { AppWrapper } from './AppWrapper';
import { Dashboard } from './Dashboard';
import { Login } from './Login';

import { Products } from './Products';

export const App = (props) => {
	return (
		<BrowserRouter>
			<AppWrapper>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/products' element={<Products />} />
				</Routes>
			</AppWrapper>
		</BrowserRouter>
	);
};
