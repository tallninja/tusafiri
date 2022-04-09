import { useNavigate } from 'react-router-dom';

import Search from './Search';
import useSearch from '../hooks/useSearch';
import AdCards from './AdCards';
import ShowcaseCards from './ShowcaseCards';

const Home = () => {
	const navigate = useNavigate();
	const { setSearch } = useSearch();

	const handleSearch = async (terms) => {
		try {
			setSearch(terms);
			navigate('/search');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<Search handleSearch={handleSearch} />
			<AdCards />
			<ShowcaseCards />
		</>
	);
};

export default Home;
