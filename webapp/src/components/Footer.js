import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className='container footer mb-0 mt-4'>
			<footer className='d-flex justify-content-between align-items-center p-3 border-top'>
				<div className='col-md-4 d-flex align-items-center align-content-center'>
					<Link
						to='/'
						className='mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1'
					>
						<i className='fa-solid fa-bus'></i>
					</Link>
					<span className='text-muted'>&copy; 2022 Easy Coach</span>
				</div>

				<ul className='nav col-md-4 justify-content-end list-unstyled d-flex'>
					<li className='ms-3'>
						<Link
							to='https://twitter.com'
							replace={true}
							className='text-muted'
							href='#'
						>
							<i className='fa-brands fa-twitter w-100 h-100'></i>
						</Link>
					</li>
					<li className='ms-3'>
						<Link
							to='https://instagram.com'
							replace
							className='text-muted'
							href='#'
						>
							<i className='fa-brands fa-instagram w-100 h-100'></i>
						</Link>
					</li>
					<li className='ms-3'>
						<Link
							to='https://facebook.com'
							replace
							className='text-muted'
							href='#'
						>
							<i className='fa-brands fa-facebook w-100 h-100'></i>
						</Link>
					</li>
				</ul>
			</footer>
		</div>
	);
};

export default Footer;
