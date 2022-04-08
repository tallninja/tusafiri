import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className='container'>
			<footer className='d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top'>
				<div className='col-md-4 d-flex align-items-center'>
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
						<Link to='https://twitter.com' className='text-muted' href='#'>
							<i className='fa-brands fa-twitter w-100 h-100'></i>
						</Link>
					</li>
					<li className='ms-3'>
						<Link to='https://instagram.com' className='text-muted' href='#'>
							<i className='fa-brands fa-instagram w-100 h-100'></i>
						</Link>
					</li>
					<li className='ms-3'>
						<Link to='https://facebook.com' className='text-muted' href='#'>
							<i className='fa-brands fa-facebook w-100 h-100'></i>
						</Link>
					</li>
				</ul>
			</footer>
		</div>
	);
};

export default Footer;
