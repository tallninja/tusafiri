import { Link } from 'react-router-dom';

const PageNotFound = () => {
	return (
		<div className='container d-flex justify-content-center align-items-center align-content-center  w-100 h-100'>
			<div className='d-flex flex-column justify-content-center align-items-center align-content-center  p-6'>
				<h1>Oops 404 Page Not Found</h1>
				<Link to='/' className='btn btn-dark btn-large'>
					Home
				</Link>
			</div>
		</div>
	);
};

export default PageNotFound;
