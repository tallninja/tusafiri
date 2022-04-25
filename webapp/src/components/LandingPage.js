/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';

import './landingPage.css';

const LandingPage = () => {
	return (
		<>
			<section className='bg-dark text-light p-5 text-center text-sm-start'>
				<div className='container'>
					<div className='d-md-flex align-items-center justify-content-between'>
						<div id='#about'>
							<h3>
								Welcome to <span className='text-danger'>EasyCoach</span>{' '}
								Transport Service
							</h3>
							<p>
								We are a passenger transport and courier service provider
								offering reliable services.
							</p>
							<Link to='/home' className='btn btn-primary btn-md'>
								Get Started
							</Link>
						</div>

						<img
							src={`${process.env.PUBLIC_URL}/assets/images/bg.png`}
							alt=''
							className='img-fluid w-50 d-none d-sm-block'
						/>
					</div>
				</div>
			</section>

			<section
				id='#newsletter'
				className='bg-black bg-opacity-50 text-light p-5'
			>
				<div className='container'>
					<div className='d-md-flex justify-content-between align-items-centre'>
						<h3 className='mb-3 mb-md-0'>Sign up for our newsletter</h3>
						<div className='input-group news-input'>
							<input
								type='text'
								className='form-control'
								placeholder='Enter your email'
							/>

							<button className='btn btn-dark btn-md' type='button'>
								Submit
							</button>
						</div>
					</div>
				</div>
			</section>

			<section className='p-5'>
				<div className='container'>
					<div className='row text-center g-4'>
						<div className='col-md'>
							<div className='card bg-dark text-light'>
								<div className='card-body text-center'>
									<div className='h1 mb-3'>
										<i className='fa-solid fa-map-location-dot'></i>
									</div>
									<h3 className='card-title'>Travel</h3>
									<p className='card-text'>
										We cover 37 routes and a total of 20 outlets countrywide
									</p>
									<a href='#travel' className='btn-outline-success'>
										Read More
									</a>
								</div>
							</div>
						</div>
						<div className='col-md'>
							<div className='card bg-dark text-light'>
								<div className='card-body text-center'>
									<div className='h1 mb-3'>
										<i className='fa-solid fa-truck'></i>
									</div>
									<h3 className='card-title'>Courier</h3>
									<p className='card-text'>We offer courier services too</p>
									<a href='#courier' className='btn-outline-success'>
										Read More
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id='travel' className='p-5 bg-black text-success'>
				<div className='container'>
					<div className='row align-items-center justify-content-between'>
						<div className='col-md'>
							<img src='coach.png' className='img-fluid' alt='' />
						</div>
						<div className='col-md p-5'>
							<h2>Travel services</h2>
							<p>
								From scheduled passenger services to 37 destinations to a
								dedicated bus hire service and corporate travel for companies,
								Easy Coach is a go-to provider of long-distance travel
								solutions.
							</p>
							<a href='#' className='btn btn-light mt-3'>
								Read more
								<i className='bi bi-chevron-right'></i>
							</a>
						</div>
					</div>
				</div>
			</section>

			<section id='courier' className='p-5 bg-dark text-danger'>
				<div className='container'>
					<div className='row align-items-center justify-content-between'>
						<div className='col-md p-5'>
							<h2>Courier services</h2>
							<p>
								Our company is licensed to carry cargo in the undercarrieage
								boots.
							</p>
							<a href='#' className='btn btn-light mt-3'>
								Read more
								<i className='bi bi-chevron-right'></i>
							</a>
						</div>
						<div className='col-md'>
							<img src='courier.jpg' className='img-fluid' alt='' />
						</div>
					</div>
				</div>
			</section>
			<section id='faq' className='p-5'>
				<div className='container '>
					<h2 className='text-center text-light'>FAQ</h2>
					<div className='accordion accordion-flush' id='questions'>
						<div className='accordion-item'>
							<h2 className='accordion-header' id='flush-headingOne'>
								<button
									className='accordion-button collapsed'
									type='button'
									data-bs-toggle='collapse'
									data-bs-target='#flush-collapseOne'
									aria-expanded='false'
									aria-controls='flush-collapseOne'
								>
									Can i book a bus prior to the travel date
								</button>
							</h2>
							<div
								id='flush-collapseOne'
								className='accordion-collapse collapse text-success'
								aria-labelledby='flush-headingOne'
								data-bs-parent='#accordionFlushExample'
							>
								<div className='accordion-body'>
									Yes you can through any internet-enabled device. Once you
									register on our website, all these services are available to
									you.
								</div>
							</div>
						</div>
						<div className='accordion-item'>
							<h2 className='accordion-header' id='flush-headingTwo'>
								<button
									className='accordion-button collapsed'
									type='button'
									data-bs-toggle='collapse'
									data-bs-target='#flush-collapseTwo'
									aria-expanded='false'
									aria-controls='flush-collapseTwo'
								>
									How easily can i manouvre through the system?
								</button>
							</h2>
							<div
								id='flush-collapseTwo'
								className='accordion-collapse collapse text-success'
								aria-labelledby='flush-headingTwo'
								data-bs-parent='#accordionFlushExample'
							>
								<div className='accordion-body'>
									The whole process is guided. This makes it easy for both a new
									and existing user to interact with the system.
								</div>
							</div>
						</div>
						<div className='accordion-item'>
							<h2 className='accordion-header' id='flush-headingThree'>
								<button
									className='accordion-button collapsed'
									type='button'
									data-bs-toggle='collapse'
									data-bs-target='#flush-collapseThree'
									aria-expanded='false'
									aria-controls='flush-collapseThree'
								>
									Can i access my travel and courier history for future
									reference?
								</button>
							</h2>
							<div
								id='flush-collapseThree'
								className='accordion-collapse collapse text-success'
								aria-labelledby='flush-headingThree'
								data-bs-parent='#accordionFlushExample'
							>
								<div className='accordion-body'>
									You can easily retrieve your history and gain access to your
									previously fulfilled services
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section id='contact' className='p-5'>
				<div className='container'>
					<div className='row g-4'>
						<div className='col-md'>
							<h2 className='text-center mb-4'>Contact Info</h2>
							<ul className='list-group list-group-flush lead'>
								<li className='list-group-item'>
									<span className='fw-bold'> Main Location:</span> Kenya
									Railways Nairobi
								</li>
								<li className='list-group-item'>
									<span className='fw-bold'> Contact:</span> 0738200300 ||
									0726354300
								</li>
								<li className='list-group-item'>
									<span className='fw-bold'> Email:</span> info@easycoachltd.com
								</li>
								<li className='list-group-item'>
									<span className='fw-bold'> Our social media handles:</span>{' '}
									@Easycoachltd
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default LandingPage;
