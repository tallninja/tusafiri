import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav
			id='sidebarMenu'
			className='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse'
		>
			<div className='position-sticky pt-3'>
				<ul className='nav flex-column'>
					<li className='nav-item'>
						<Link to={'/'} className='nav-link active' aria-current='page'>
							<span data-feather='home'></span>
							Dashboard
						</Link>
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
								<Link to={'/employees/drivers'} className='nav-link'>
									Drivers
								</Link>
							</li>
							<li>
								<Link to={'/employees/fleet-managers'} className='nav-link'>
									Fleet Managers
								</Link>
							</li>
							<li>
								<Link to={'/employees/snm-managers'} className='nav-link'>
									Service and maintenance
								</Link>
							</li>
							<li>
								<Link to={'/employees/help-desk'} className='nav-link'>
									Support and help desk
								</Link>
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
								<Link to={'/fleets/journeys'} className='nav-link' href='#'>
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
						<Link to={'/bookings'} className='nav-link'>
							<span data-feather='shopping-cart'></span>
							Bookings
						</Link>
					</li>
					<li className='nav-item'>
						<Link to='/invoices' className='nav-link' href='#'>
							<span data-feather='users'></span>
							Invoices
						</Link>
					</li>
					<li className='nav-item'>
						<Link to='/payments' className='nav-link' href='#'>
							<span data-feather='bar-chart-2'></span>
							Payments
						</Link>
					</li>
					<li className='nav-item'>
						<Link to='/tickets' className='nav-link'>
							<span data-feather='file'></span>
							Tickets
						</Link>
					</li>
					<li className='nav-item'>
						<Link to='/users' className='nav-link' href='#'>
							<span data-feather='layers'></span>
							Users
						</Link>
					</li>
					<li className='nav-item'>
						<Link to='/feedbacks' className='nav-link' href='#'>
							<span data-feather='layers'></span>
							Feedbacks
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
