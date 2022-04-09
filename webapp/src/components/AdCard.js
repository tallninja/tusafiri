const AdCard = ({ title, text, iconClass }) => {
	return (
		<div className='col-md-4 d-flex mx-auto my-2 p-4 primary-invert'>
			<h1 className='mx-3'>
				<i className={iconClass}></i>
			</h1>
			<div className='row'>
				<h4>{title}</h4>
				<p>{text}</p>
			</div>
		</div>
	);
};

export default AdCard;
