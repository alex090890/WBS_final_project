import { useState } from 'react';
import axios from 'axios';
import { Input } from 'antd';
import { CiSearch } from "react-icons/ci";

export default function SearchUa() { 
      const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    try {
      const response = await axios.get(`https://wordweb.vercel.app/searchcards?q=${query}`);
      setResults(response.data); // Set the search results into state
      setShowResults(true); // Show the search results
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleClearResults = () => {
    setResults([]); // Clear the search results
    setShowResults(false); // Hide the search results
  };

    return (
        <div>
            <form onSubmit={handleSearch}>
        <Input
          type="text"
            value={query}
            prefix={ <CiSearch />}
          onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cards..." 
            className='search-input'
                    
        />
        <button type="submit" className='search-btn'>Search</button>
      </form>
      <ul>
        {showResults && results.map((card) => (
          <li key={card._id}>{card.front} - {card.back}</li>
        ))}
          </ul>
          {showResults && <button onClick={handleClearResults} className='search-btn'>Clear All Results</button>}
        </div>
    )
}