import { useState, createContext } from 'react';
import { Outlet } from 'react-router-dom';

const SearchContext = createContext({});

export const SearchProvider = () => {
	const [search, setSearch] = useState({});

	return (
		<SearchContext.Provider value={{ search, setSearch }}>
			<Outlet />
		</SearchContext.Provider>
	);
};

export default SearchContext;
