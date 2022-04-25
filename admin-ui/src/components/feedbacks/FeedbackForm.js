/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getFeedbackTypes } from '../../api';

export const FeedbackForm = ({ onSubmit }) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNo, setPhoneNo] = useState('');
	const [type, setType] = useState('');
	const [title, setTitle] = useState('');
	const [content, setContent] = useState();
	const [types, setTypes] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const res = await getFeedbackTypes();
				setTypes(res.data);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		})();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ firstName, lastName, email, phoneNo, type, title, content });
	};

	return (
		<form className='g-3 mt-4' onSubmit={handleSubmit}>
			<div className='row'>
				<h4>Contact Information</h4>
				<hr />
				<div className='col-md-6 mb-3'>
					<label htmlFor='firstNameInput' className='form-label'>
						First Name
					</label>
					<input
						type={'text'}
						className='form-control'
						id='firstNameInput'
						placeholder='John'
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>
				<div className='col-md-6 mb-3'>
					<label htmlFor='inputPassword4' className='form-label'>
						Last Name
					</label>
					<input
						type={'text'}
						className='form-control'
						id='inputPassword4'
						placeholder='Doe'
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div className='col-md-6 mb-3'>
					<label htmlFor='emailInput' className='form-label'>
						Email
					</label>
					<input
						type={'text'}
						className='form-control'
						id='emailInput'
						placeholder='user@example.com'
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='col-md-6 mb-3'>
					<label htmlFor='phoneInput' className='form-label'>
						Phone Number
					</label>
					<input
						type={'text'}
						className='form-control'
						id='phoneInput'
						placeholder='+254...'
						onChange={(e) => setPhoneNo(e.target.value)}
					/>
				</div>
				<h4>Content</h4>
				<hr />
				<div className='col-md-12 mb-3'>
					<label htmlFor='typeSelect' className='form-label'>
						Type
					</label>
					<select
						id='typeSelect'
						className='form-select'
						onChange={(e) => setType(e.target.value)}
					>
						<option value=''>Select Type...</option>
						{types?.map((feedbackType, idx) => (
							<option key={idx} value={feedbackType.name}>
								{feedbackType.name[0].toUpperCase() +
									feedbackType.name.slice(1)}
							</option>
						))}
					</select>
				</div>
				<div className='col-md-12'>
					<label htmlFor='titleInput' className='form-label'>
						Title
					</label>
					<input
						type={'text'}
						className='form-control'
						id='titleInput'
						placeholder='Lorem Ipsum'
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
			</div>
			<div className='form-floating mt-3'>
				<textarea
					id='contentTextArea'
					className='form-control'
					style={{ height: '10rem' }}
					placeholder='Your Feedback'
					onChange={(e) => setContent(e.target.value)}
				></textarea>
				<label htmlFor='contentTextArea'>Content</label>
			</div>
			<div className='d-flex justify-content-between my-3 '>
				<a
					className='btn btn-info btn-lg frac-width'
					role={'button'}
					onClick={() => navigate(-1)}
				>
					Cancel
				</a>
				<button className='btn btn-dark btn-lg frac-width' type='submit'>
					Send
				</button>
			</div>
		</form>
	);
};
