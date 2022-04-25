import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
	const { auth } = useAuth();

	const navigate = useNavigate();
	const logout = useLogout();

	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-white py-md-4'>
			<div className='container-fluid'>
				<Link to='/home' className='navbar-brand'>
					<span id='logo-span'>
						<i className='fa-solid fa-bus'></i> Easy
					</span>{' '}
					Coach
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav mx-auto'>
						<li className='nav-item'>
							<Link to='/home' className='nav-link active' aria-current='page'>
								Home
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='#about' className='nav-link'>
								About Us
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='#contact' className='nav-link'>
								Contact Us
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='#faq' className='nav-link'>
								FAQs
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/feedback' className='nav-link'>
								Feedback
							</Link>
						</li>
					</ul>
					{auth.accessToken ? (
						<>
							<ul className='navbar-nav mr-auto'>
								<li className='nav-item dropdown'>
									<Link
										to='#'
										className='nav-link dropdown-toggle'
										id='navbarDropdown'
										role='button'
										data-bs-toggle='dropdown'
										aria-expanded='false'
									>
										{auth.firstName} {auth.lastName}
									</Link>
									<ul
										className='dropdown-menu'
										aria-labelledby='navbarDropdown'
									>
										<li>
											<Link to='/user/bookings' className='dropdown-item'>
												<i className='fa-solid fa-bookmark'></i> My Bookings
											</Link>
										</li>
										<li>
											<Link to='/user/invoices' className='dropdown-item'>
												<i className='fa-solid fa-file-invoice'></i> My Invoices
											</Link>
										</li>
										<li>
											<Link to='/home' className='dropdown-item'>
												<i className='fa-solid fa-user'></i> Profile
											</Link>
										</li>
										<li>
											<hr className='dropdown-divider' />
										</li>
										<li>
											<Link to='#' className='dropdown-item' onClick={logout}>
												<i className='fa-solid fa-door-open'></i> Logout
											</Link>
										</li>
									</ul>
								</li>
							</ul>
							<div className='ml-4'>
								<p className='d-inline opacity-0'>Space</p>
							</div>
						</>
					) : (
						<button
							className='btn btn-outline-dark'
							onClick={() => navigate('/login')}
						>
							Login
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
