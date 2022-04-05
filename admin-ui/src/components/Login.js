/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { signin } from '../api';
import useAuth from '../hooks/useAuth';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { setAuth } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || '/';

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await signin({ email, password });
		if (res.status === 200) {
			const { id, email, accessToken } = res.data;
			setAuth({ user: id, email, accessToken });
			setEmail('');
			setPassword('');
			navigate(from, { replace: true });
		}
	};

	return (
		<div className='wrap-login container d-flex align-items-center justify-content-center'>
			<div className='login-container px-5 py-5'>
				<form onSubmit={handleSubmit}>
					<span className='login-form-title pb-3'>Login</span>
					<div className='mb-3'>
						<label htmlFor='email' className='form-label login-form-label'>
							Email
						</label>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='mb-3'>
						<label htmlFor='password' className='form-label login-form-label'>
							Password
						</label>
						<input
							type='password'
							className='form-control'
							id='password'
							name='password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className='d-flex justify-content-between'>
						<div className='mb-3 form-check'>
							<input
								type='checkbox'
								className='form-check-input'
								id='remember-me'
							/>
							<label className='form-check-label' htmlFor='remember-me'>
								Remember me
							</label>
						</div>
						<a href='#'>Forgot Password ?</a>
					</div>
					<div className='d-grid'>
						<button className='btn btn-secondary' type='submit'>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
