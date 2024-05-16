import { useState } from 'react';
import axios from 'axios';
import { Input } from 'antd';
import { CiSearch } from "react-icons/ci";
import PropTypes from 'prop-types';

export default function SearchUa({ user }) { 
      const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

   const handleSearch = async (e) => {
  e.preventDefault();
  try {
    const query = e.target.search.value.trim();
    if (query === '') {
      return;
    }

    const response = await axios.get(`https://wordweb.vercel.app/searchcards/${user.login}?q=${encodeURIComponent(query)}`);
    setResults(response.data.filter((card) => card.front.toLowerCase() === query.toLowerCase()));
    setShowResults(true);
  } catch (error) {
    console.error('Search failed:', error);
  }
};

 const handleClearResults = () => {
    setResults([]);
    setShowResults(false);
  };

  SearchUa.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired
  }).isRequired
};

    return (
        <div>
            <form onSubmit={handleSearch}>
        <Input
          type="text"
            value={query}
            prefix={ <CiSearch />}
          onChange={(e) => setQuery(e.target.value)}
            placeholder="Пошук карток..." 
            className='search-input'
                    
        />
        <button type="submit" className='search-btn'>Пошук</button>
      </form>
      <ul>
        {showResults && results.map((card) => (
          <li key={card._id}>{card.front} - {card.back}</li>
        ))}
          </ul>
          {showResults && <button onClick={handleClearResults} className='search-btn'>Очистити результати пошуку</button>}
        </div>
    )
}