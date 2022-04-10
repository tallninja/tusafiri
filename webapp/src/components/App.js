import { Routes, Route } from 'react-router-dom';

import './index.css';
import AppWrapper from './AppWrapper';
import Home from './Home';
import Login from './Login';
import SearchResults from './SearchResults';
import ProtectedRoute from './ProtectedRoute';
import PersistLogin from './PersistLogin';
import Signup from './Signup';

const App = () => {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Signup />} />
			<Route element={<PersistLogin />}>
				<Route path='/' element={<AppWrapper />}>
					<Route index element={<Home />} />
					<Route path='search' element={<SearchResults />} />
					<Route element={<ProtectedRoute />}>
						<Route path='book-journey' element={<Home />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	);
};

export default App;
