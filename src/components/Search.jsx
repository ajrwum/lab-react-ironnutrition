import React from 'react';

const Search = ({ searchedString, handleSearch }) => {

  return (
  <>
    <input type="text"
            placeholder="Filter food by name"
            className="input is-large mb-6"
            value={searchedString}
            onChange={e => handleSearch(e.target.value)} />
  </>
  );
};

export default Search;
