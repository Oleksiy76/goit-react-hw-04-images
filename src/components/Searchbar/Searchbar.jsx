import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = event => {
    setSearchValue(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchValue.trim() === '') {
      Notiflix.Notify.warning('Please enter your search query!');
      return;
    }
    onSubmit(searchValue);
    setSearchValue('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <span className={css.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={css.SearchForm_input}
          name="searchValue"
          value={searchValue}
          onChange={handleInputChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
