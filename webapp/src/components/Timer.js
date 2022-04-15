import { useState, useEffect } from 'react';

const Timeout = ({ handleTimeOut }) => {
	useEffect(() => {
		handleTimeOut();
	}, [handleTimeOut]);
	return (
		<p className='mx-1 h5 lead' on>
			Time's Up.
		</p>
	);
};

const Timer = ({ date, handleTimeOut }) => {
	const calculateTimeLeft = () => {
		let currentTime = new Date().getTime();
		let futureTime = new Date(date).getTime();
		let timeDifferenceMs = futureTime - currentTime;

		let timeLeft = {};

		if (timeDifferenceMs > 0) {
			timeLeft = {
				days: Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24)),
				hours: Math.floor((timeDifferenceMs / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((timeDifferenceMs / (1000 * 60)) % 60),
				seconds: Math.floor((timeDifferenceMs / 1000) % 60),
			};
		}

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearTimeout(timer);
	});

	const timerComponents = [];

	Object.keys(timeLeft).forEach((interval) => {
		if (!timeLeft[interval]) {
			return;
		}

		timerComponents.push(
			<span
				className={`mx-1 h5 lead ${
					!timeLeft.days &&
					!timeLeft.hours &&
					!timeLeft.minutes &&
					timeLeft.seconds <= 59
						? 'text-danger'
						: ''
				}`}
				key={interval}
			>
				{timeLeft[interval]} {interval}
			</span>
		);
	});

	return (
		<>
			{timerComponents.length ? (
				timerComponents
			) : (
				<Timeout handleTimeOut={handleTimeOut} />
			)}
		</>
	);
};

export default Timer;
