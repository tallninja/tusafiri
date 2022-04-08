import { Link } from 'react-router-dom';

const Login = () => {
	return (
		<div className='wrap-login container d-flex align-items-center justify-content-center'>
			<div className='login-container px-5 py-5'>
				<form onSubmit={() => console.log('test')}>
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
							onChange={() => console.log('test')}
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
							onChange={() => console.log('test')}
						/>
					</div>
					<div className='d-flex justify-content-between'>
						<div className='mb-3 form-check'>
							<input
								type='checkbox'
								className='form-check-input'
								id='remember-me'
								onChange={() => console.log('test')}
								checked={false}
							/>
							<label className='form-check-label' htmlFor='remember-me'>
								Remember me
							</label>
						</div>
						<Link to='/' href='#'>
							Forgot Password ?
						</Link>
					</div>
					<div className='d-grid'>
						<button className='btn btn-dark' type='submit'>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
