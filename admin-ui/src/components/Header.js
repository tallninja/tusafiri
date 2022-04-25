/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

import useLogout from '../hooks/useLogout';

const Header = ({ title }) => {
	const logout = useLogout();

	return (
		<header className='navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow'>
			<Link to='/' className='navbar-brand col-md-3 col-lg-2 me-0 px-3'>
				{title}
			</Link>
			<button
				className='navbar-toggler position-absolute d-md-none collapsed'
				type='button'
				data-bs-toggle='collapse'
				data-bs-target='#sidebarMenu'
				aria-controls='sidebarMenu'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<span className='navbar-toggler-icon'></span>
			</button>
			<input
				className='form-control form-control-dark w-100'
				type='text'
				placeholder='Search'
				aria-label='Search'
			/>
			<div className='navbar-nav'>
				<div className='nav-item text-nowrap'>
					<a className='nav-link px-3' onClick={logout}>
						Sign out
					</a>
				</div>
			</div>
		</header>
	);
};

export default Header;
