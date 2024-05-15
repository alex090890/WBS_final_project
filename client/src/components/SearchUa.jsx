import { useState } from 'react';
import axios from 'axios';
import { Input } from 'antd';
import { CiSearch } from "react-icons/ci";

export default function SearchUa() { 
      const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://wordweb.vercel.app/searchcards?q=${query}`);
      setResults(response.data);
      setShowResults(true);
    } catch (error) {
      console.error('Помилка', error);
    }
  };

  const handleClearResults = () => {
    setResults([]);
    setShowResults(false);
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