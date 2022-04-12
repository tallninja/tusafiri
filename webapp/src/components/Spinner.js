const Spinner = () => {
	return (
		<div className='w-100 h-100 d-flex justify-content-center align-items-center'>
			<div
				className='spinner-border spinner-primary'
				style={{
					width: '3rem',
					height: '3rem',
				}}
				role='status'
			>
				<span className='visually-hidden'>Loading...</span>
			</div>
		</div>
	);
};

export default Spinner;
