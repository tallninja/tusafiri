import React from 'react';
import SmallBox from './SmallBox';

export const Dashboard = () => {
	return (
		<>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
				<h2 className='h2'>Dashboard</h2>
				<div className='btn-toolbar mb-2 mb-md-0'>
					<div className='btn-group me-2'>
						<button type='button' className='btn btn-sm btn-outline-secondary'>
							Share
						</button>
						<button type='button' className='btn btn-sm btn-outline-secondary'>
							Export
						</button>
					</div>
					<button
						type='button'
						className='btn btn-sm btn-outline-secondary dropdown-toggle'
					>
						<span data-feather='calendar'></span>
						This week
					</button>
				</div>
			</div>

			<section className='content'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-lg-3 col-6'>
							<SmallBox
								count={150}
								text='New Orders'
								icon='ion ion-bag'
								color='info'
							/>
						</div>
						<div className='col-lg-3 col-6'>
							<SmallBox
								count={150}
								text='New Orders'
								icon='ion ion-bag'
								color='success'
							/>
						</div>
						<div className='col-lg-3 col-6'>
							<SmallBox
								count={150}
								text='New Orders'
								icon='ion ion-bag'
								color='warning'
							/>
						</div>
						<div className='col-lg-3 col-6'>
							<SmallBox
								count={150}
								text='New Orders'
								icon='ion ion-bag'
								color='danger'
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
