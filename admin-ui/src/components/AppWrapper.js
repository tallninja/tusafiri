/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import SidebarMenu from './SidebarMenu';

const AppWrapper = () => {
	return (
		<>
			<div className='container-fluid'>
				<div className='row'>
					<Header title='Tusafiri Admin' />
					<SidebarMenu />
					<main className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
};

export default AppWrapper;
