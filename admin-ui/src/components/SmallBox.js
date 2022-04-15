import { Link } from 'react-router-dom';

const SmallBox = ({ count, text, icon, color, link }) => {
	return (
		<div className={`small-box box-${color}`}>
			<div className='inner'>
				<h3>{count}</h3>

				<p>{text}</p>
			</div>
			<div className='icon'>
				<i className={icon}></i>
			</div>
			<Link to={link} className='small-box-footer'>
				More info <i className='fas fa-arrow-circle-right'></i>
			</Link>
		</div>
	);
};

export default SmallBox;
