import React, { useState, useEffect,useContext } from 'react';
import { searchFood } from './search';
import { MdPhotoCamera } from 'react-icons/md';
import { UserLocationContext } from '@/context/UserLocationContext';
import HeaderNavBar from '../HeaderNavBar';


const SearchBar = ({ onSearchResult, handleCameraClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [displayResults, setDisplayResults] = useState([]);
  const displayedResults = searchResults.slice(0, 6);
  const { userLocation } = useContext(UserLocationContext);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const results = searchFood(query);
    setSearchResults(results);
    setDisplayResults(displayedResults);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      const result = searchResults[0];
      if (result) {
        onSearchResult(result.label);
      } else {
        console.error("No matching result found");
      }
      setDisplayResults([]);
    }
  };

  const handleClickOutside = (event) => {
    if (displayResults.length > 0 && !event.target.closest('.search-container')) {
      setDisplayResults([]);
    }
  };

    const handleResultClick = (result) => {
      if (userLocation) {
        const { lat: userLat, lng: userLng } = userLocation;
        const { lat, lng } = result;

        // Tạo URL chỉ đường đến Google Maps
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${lat},${lng}`;
        window.open(googleMapsUrl, '_blank');
      }
    };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [searchResults]);

  return (
    <div className="bg-gray-100 rounded-md w-[35%] gap-3 hidden md:flex items-center relative search-container">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
      <input 
        type="text" 
        placeholder="Search" 
        className="bg-transparent outline-none w-full" 
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
      />  

      {displayResults.length > 0 && (
        <ul className="search-results absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md z-10">
          {displayResults.map((result, index) => (
            <li key={index} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleResultClick(result)}>
              {result.title} - {result.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
