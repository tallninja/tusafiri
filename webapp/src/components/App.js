import { Routes, Route } from 'react-router-dom';

import './index.css';
import AppWrapper from './AppWrapper';
import Home from './Home';
import Login from './Login';
import SearchResults from './SearchResults';

const App = () => {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/' element={<AppWrapper />}>
				<Route index element={<Home />} />
				<Route path='search' element={<SearchResults />} />
			</Route>
		</Routes>
	);
};

export default App;
