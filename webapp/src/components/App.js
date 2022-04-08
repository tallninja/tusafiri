import { Routes, Route } from 'react-router-dom';

import './index.css';
import AppWrapper from './AppWrapper';
import Home from './Home';
import Login from './Login';

const App = () => {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/' element={<AppWrapper />}>
				<Route index element={<Home />} />
			</Route>
		</Routes>
	);
};

export default App;
