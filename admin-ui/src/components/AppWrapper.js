/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

export const AppWrapper = (props) => {
	return (
		<>
			<header className='navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow'>
				<Link to={'/'} className='navbar-brand col-md-3 col-lg-2 me-0 px-3'>
					Tusafiri Admin
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
						<a className='nav-link px-3' href='#'>
							Sign out
						</a>
					</div>
				</div>
			</header>

			<div className='container-fluid'>
				<div className='row'>
					<nav
						id='sidebarMenu'
						className='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse'
					>
						<div className='position-sticky pt-3'>
							<ul className='nav flex-column'>
								<li className='nav-item'>
									<a className='nav-link active' aria-current='page' href='#'>
										<span data-feather='home'></span>
										Dashboard
									</a>
								</li>
								<li className='nav-item'>
									<a
										className='nav-link'
										data-bs-toggle='collapse'
										href='#employeesCollapse'
										role='button'
										aria-expanded='false'
										aria-controls='employeesCollapse'
									>
										Employee Management
									</a>
									<ul className='collapse' id='employeesCollapse'>
										<li>
											<a className='nav-link' href='#'>
												Drivers
											</a>
										</li>
										<li>
											<a className='nav-link' href='#'>
												Fleet Managers
											</a>
										</li>
										<li>
											<a className='nav-link' href='#'>
												Service and maintenance
											</a>
										</li>
										<li>
											<a className='nav-link' href='#'>
												Support and help desk
											</a>
										</li>
									</ul>
								</li>
								<li className='nav-item'>
									<a
										className='nav-link'
										data-bs-toggle='collapse'
										href='#fleetCollapse'
										role='button'
										aria-expanded='false'
										aria-controls='fleetCollapse'
									>
										Fleet Management
									</a>
									<ul className='collapse' id='fleetCollapse'>
										<li>
											<Link to={'/fleets/Buses'} className='nav-link'>
												Buses
											</Link>
										</li>
										<li>
											<Link
												to={'/fleets/journeys'}
												className='nav-link'
												href='#'
											>
												Journeys
											</Link>
										</li>
										<li>
											<Link to={'/fleets/routes'} className='nav-link'>
												Routes
											</Link>
										</li>
										<li>
											<Link to={'/fleets/locations'} className='nav-link'>
												Locations
											</Link>
										</li>
									</ul>
								</li>
								<li className='nav-item'>
									<a className='nav-link' href='#'>
										<span data-feather='file'></span>
										Tickets
									</a>
								</li>
								<li className='nav-item'>
									<Link to={'/products'} className='nav-link'>
										<span data-feather='shopping-cart'></span>
										Bookings
									</Link>
								</li>
								<li className='nav-item'>
									<a className='nav-link' href='#'>
										<span data-feather='users'></span>
										Invoices
									</a>
								</li>
								<li className='nav-item'>
									<a className='nav-link' href='#'>
										<span data-feather='bar-chart-2'></span>
										Payments
									</a>
								</li>
								<li className='nav-item'>
									<a className='nav-link' href='#'>
										<span data-feather='layers'></span>
										Users
									</a>
								</li>
							</ul>
						</div>
					</nav>

					<main className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
						{props.children}
					</main>
				</div>
			</div>
		</>
	);
};
