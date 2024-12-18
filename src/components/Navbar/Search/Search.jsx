import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
	const [search, setSearch] = useState('');
	const navigate = useNavigate();

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();

			if (!search.trim()) {
				alert('Masukkan kata kunci pencarian.');
				return;
			}

			navigate(`/news/${search.trim()}`);
			setSearch(''); 
		}
	};

	return (
		<div className="flex items-center border rounded-lg px-2 py-1 bg-white w-full md:w-auto md:ml-4">
			<input type="text" className="outline-none px-2 py-1 w-60" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} />
		</div>
	);
};

export default Search;
