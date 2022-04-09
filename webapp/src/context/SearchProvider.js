import { useState, createContext } from 'react';

const SearchContext = createContext({});

export const SearchProvider = ({ children }) => {
	const [search, setSearch] = useState({});
	const [journeys, setJourneys] = useState([]);

	return (
		<SearchContext.Provider
			value={{ search, setSearch, journeys, setJourneys }}
		>
			{children}
		</SearchContext.Provider>
	);
};

export default SearchContext;
