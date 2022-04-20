import { Link } from 'react-router-dom';

const PageNotFound = () => {
	return (
		<div className='container d-flex justify-content-center align-items-center align-content-center h-75'>
			<div className='d-flex flex-column justify-content-center align-items-center align-content-center  p-6'>
				<h1>Oops 404 Page Not Found</h1>
				<Link to='/home' className='btn btn-primary btn-large'>
					Back Home
				</Link>
			</div>
		</div>
	);
};

export default PageNotFound;
