/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getFeedback, setReviewed } from '../../api';

export const Feedback = () => {
	const [feedback, setFeedback] = useState({});

	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const res = await getFeedback(id);
				setFeedback(res.data);
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		})();
	}, [id]);

	const handleReviewed = async () => {
		try {
			const res = await setReviewed(feedback._id);
			setFeedback(res.data);
			toast.info('Feedback was reviewed.');
		} catch (err) {
			console.error(err?.response?.data);
			toast.error(err?.response?.data?.message || 'An error occured.');
		}
	};

	return (
		<>
			<div className='row mt-3'>
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
						disabled
						value={feedback.firstName || 'N/A'}
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
						disabled
						value={feedback.lastName || 'N/A'}
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
						disabled
						value={feedback.email || 'N/A'}
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
						disabled
						value={feedback.phoneNo || 'N/A'}
					/>
				</div>
				<h4>Content</h4>
				<hr />
				<div className='col-md-12 mb-3'>
					<label htmlFor='typeSelect' className='form-label'>
						Type
					</label>
					<input
						type={'text'}
						className='form-control'
						id='phoneInput'
						disabled
						value={feedback.type?.name || 'N/A'}
					/>
				</div>
				<div className='col-md-12'>
					<label htmlFor='titleInput' className='form-label'>
						Title
					</label>
					<input
						type={'text'}
						className='form-control'
						id='titleInput'
						disabled
						value={feedback.title || 'N/A'}
					/>
				</div>
			</div>
			<div className='form-floating mt-3'>
				<textarea
					id='contentTextArea'
					className='form-control'
					style={{ height: '10rem' }}
					disabled
					value={feedback.content || 'N/A'}
				></textarea>
				<label htmlFor='contentTextArea'>Content</label>
			</div>
			<div className='d-flex justify-content-between my-3'>
				<a
					className='btn btn-info btn-lg frac-width'
					role={'button'}
					onClick={() => navigate(-1)}
				>
					Back
				</a>
				<button
					className='btn btn-success btn-lg frac-width'
					onClick={handleReviewed}
					disabled={feedback.reviewed}
				>
					Set Reviewed
				</button>
			</div>
		</>
	);
};
