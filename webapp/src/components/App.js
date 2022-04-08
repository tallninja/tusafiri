import { Routes, Route } from 'react-router-dom';

import AppWrapper from './AppWrapper';
import Home from './Home';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<AppWrapper />}>
				<Route index element={<Home />} />
			</Route>
		</Routes>
	);
};

export default App;
