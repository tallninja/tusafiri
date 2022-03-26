import React from 'react';
import { Link } from 'react-router-dom';

export const Bus = () => {
	return (
		<>
			<div className='d-flex justify-content-between pt-3 pb-2 mb-3 border-bottom'>
				<h2>Buses</h2>
				<div>
					<Link
						to={`/fleets/buses/create`}
						className='btn btn-success'
						role={'button'}
					>
						Add
					</Link>
				</div>
			</div>
			<div className='table-responsive'>
				<table className='table table-striped table-sm'>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Header</th>
							<th scope='col'>Header</th>
							<th scope='col'>Header</th>
							<th scope='col'>Header</th>
							<th scope='col'>Actions</th>
							<th scope='col'>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1,001</td>
							<td>random</td>
							<td>data</td>
							<td>placeholder</td>
							<td>text</td>
							<td>text</td>
							<td>
								<button
									type='button'
									className='btn btn-outline-primary btn-sm mx-1'
								>
									View
								</button>
								<button type='button' className='btn btn-warning btn-sm mx-1'>
									Edit
								</button>
								<button type='button' className='btn btn-danger btn-sm mx-1'>
									Delete
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};
