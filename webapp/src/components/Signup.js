import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signup } from '../api';

const Signup = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNo, setPhoneNo] = useState('');
	const [password, setPassword] = useState('');
	const [disabled, setDisabled] = useState(true);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await signup({ firstName, lastName, email, phoneNo, password });
			toast.success('Account created successfully.');
			navigate('/login');
		} catch (err) {
			console.error(err?.response?.data);
			toast.error(err?.response?.data?.message || 'An error occured.');
		}
	};

	useEffect(() => {
		if (firstName && lastName && email && phoneNo && password)
			setDisabled(false);
	}, [firstName, lastName, email, phoneNo, password]);

	return (
		<div className='wrap-login container d-flex align-items-center justify-content-center'>
			<div className='login-container px-5 py-5'>
				<form className='row' onSubmit={handleSubmit}>
					<span className='login-form-title pb-3'>Signup</span>
					<div className='col-md-6 mb-3'>
						<label
							htmlFor='firstNameInput'
							className='form-label login-form-label'
						>
							First Name
						</label>
						<input
							type='text'
							className='form-control'
							id='firstNameInput'
							name='firstName'
							placeholder='John...'
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>
					<div className='col-md-6 mb-3'>
						<label
							htmlFor='lastNameInput'
							className='form-label login-form-label'
						>
							Last Name
						</label>
						<input
							type='text'
							className='form-control'
							id='lastNameInput'
							name='lastName'
							placeholder='Doe...'
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>
					<div className='mb-3'>
						<label htmlFor='email' className='form-label login-form-label'>
							Email
						</label>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							placeholder='user@example.com'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='mb-3'>
						<label
							htmlFor='phoneNoInput'
							className='form-label login-form-label'
						>
							Phone Number
						</label>
						<input
							type='text'
							className='form-control'
							id='phoneNoInput'
							name='phoneNo'
							placeholder='+254...'
							onChange={(e) => setPhoneNo(e.target.value)}
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
					<div className='d-flex justify-content-end'>
						<Link to='/login'>Login ?</Link>
					</div>
					<div className='d-grid my-3'>
						<button
							className='btn btn-primary'
							disabled={disabled}
							type='submit'
						>
							Create Account
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
