import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getFeedbacks, deleteFeedback } from '../../api';

import NoResults from '../NoResults';
import Spinner from '../Spinner';
import Error from '../Error';

export const Feedbacks = () => {
	const [feedbacks, setFeedbacks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				let res = await getFeedbacks();
				setFeedbacks(res.data);
				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				setIsError(true);
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		})();
	}, []);

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this record ?')) {
			try {
				const res = await deleteFeedback(id);
				setFeedbacks(
					feedbacks.filter((feedback) => feedback._id !== res.data._id)
				);
				toast.success('Feedback was deleted.');
			} catch (err) {
				console.error(err?.response?.data);
				toast.error(err?.response?.data?.message || 'An error occured.');
			}
		}
	};

	return (
		<>
			<div className='d-flex justify-content-between pt-3 pb-2 mb-3 border-bottom'>
				<h2>Feedbacks</h2>
				<div>
					<Link
						to={`/feedbacks/new`}
						className='btn btn-success'
						role={'button'}
					>
						Add
					</Link>
				</div>
			</div>
			{!isLoading && feedbacks.length ? (
				<div className='table-responsive'>
					<table className='table table-striped table-responsive-lg'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Type</th>
								<th scope='col'>Title</th>
								<th scope='col'>First Name</th>
								<th scope='col'>Last Name</th>
								<th scope='col'>Phone</th>
								<th scope='col'>Email</th>
								<th scope='col'>Reviewed</th>
								<th scope='col'>Created At</th>
								<th scope='col'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{feedbacks.map((feedback, idx) => {
								return (
									<tr key={idx}>
										<td>{idx + 1}</td>
										<td>{feedback.type?.name || '-'}</td>
										<td>
											{feedback.title.length > 10
												? feedback.title.slice(0, 11) + '...'
												: feedback.title || '-'}
										</td>
										<td>{feedback.firstName || '-'}</td>
										<td>{feedback.lastName || '-'}</td>
										<td>{feedback.phoneNo || '-'}</td>
										<td>{feedback.email || '-'}</td>
										<td>
											{feedback.reviewed ? (
												<h4>
													<i
														className='fa-solid fa-check'
														style={{ color: 'green' }}
													></i>
												</h4>
											) : (
												<h4>
													<i
														className='fa-solid fa-xmark'
														style={{ color: 'red' }}
													></i>
												</h4>
											)}
										</td>
										<td>
											{feedback.createdAt
												? new Date(feedback.createdAt).toDateString()
												: '-'}
										</td>
										<td>
											<button
												type='button'
												className='btn btn-dark btn-sm mx-1'
												data-bs-toggle='tooltip'
												data-bs-placement='top'
												title='View'
												onClick={() => navigate(`/feedbacks/${feedback._id}`)}
											>
												<i className='fa-solid fa-eye'></i>
											</button>
											<button
												type='button'
												className='btn btn-danger btn-sm mx-1'
												data-bs-toggle='tooltip'
												data-bs-placement='top'
												title='Delete'
												onClick={() => handleDelete(feedback._id)}
											>
												<i className='fa-solid fa-trash-can'></i>
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			) : isLoading ? (
				<Spinner />
			) : isError ? (
				<Error />
			) : (
				<NoResults />
			)}
		</>
	);
};
