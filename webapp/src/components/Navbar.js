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
				<Link to='/' className='navbar-brand' href='#'>
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
							<Link
								to='/'
								className='nav-link active'
								aria-current='page'
								href='#'
							>
								Home
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/' className='nav-link' href='#'>
								About Us
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/' className='nav-link' href='#'>
								Contact Us
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/' className='nav-link'>
								FAQs
							</Link>
						</li>
					</ul>
					<button
						className='btn btn-outline-dark'
						onClick={() => (auth.accessToken ? logout() : navigate('/login'))}
					>
						{auth.accessToken ? 'Logout' : 'Login'}
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
