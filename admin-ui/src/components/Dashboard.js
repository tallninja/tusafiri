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
								count={100}
								text='New Bookings'
								icon='ion ion-bag'
								color='info'
								link='/bookings'
							/>
						</div>
						<div className='col-lg-3 col-6'>
							<SmallBox
								count={20}
								text='New Buses'
								icon='ion ion-android-bus'
								color='success'
								link='/fleets/buses'
							/>
						</div>
						<div className='col-lg-3 col-6'>
							<SmallBox
								count={10}
								text='New Users'
								icon='ion ion-person-add'
								color='warning'
								link='/users'
							/>
						</div>
						<div className='col-lg-3 col-6'>
							<SmallBox
								count={50}
								text='New Destinations'
								icon='ion ion-location'
								color='danger'
								link='/fleets/locations'
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
