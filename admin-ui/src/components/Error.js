import { useNavigate } from 'react-router-dom';

const Error = () => {
	const navigate = useNavigate();
	return (
		<div className='w-100 h-100 my-4 d-flex flex-column justify-content-center align-items-center'>
			<h4>An Error Ocurred</h4>
			<button className='btn btn-primary my-3' onClick={() => navigate(-1)}>
				Go Back
			</button>
		</div>
	);
};

export default Error;
