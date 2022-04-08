import { useContext } from 'react';

import SearchContext from '../context/SearchProvider';

const useSearch = () => {
	return useContext(SearchContext);
};

export default useSearch;
