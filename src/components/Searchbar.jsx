import React, { useState, Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const Searchbar = ({ handleSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const onChange = event => {
    setSearchValue(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    if (!searchValue) {
      Notify.failure('Enter a search request !');
      return;
    }
    handleSubmit(searchValue);
  };

  return (
    <>
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={onSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            placeholder="Search images and photos"
            onChange={onChange}
          />
        </form>
      </header>
    </>
  );
};

export default Searchbar;
