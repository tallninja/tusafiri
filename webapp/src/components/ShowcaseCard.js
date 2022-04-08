const ShowcaseCard = ({ iconClass, heading, text }) => {
	return (
		<div className='card col-md-4 d-flex justify-content-center align-items-center text-center mx-3 my-2 p-4 primary-invert'>
			<h1>
				<i className={iconClass}></i>
			</h1>
			<h3>{heading}</h3>
			<div className='card-body'>{text}</div>
		</div>
	);
};

export default ShowcaseCard;
