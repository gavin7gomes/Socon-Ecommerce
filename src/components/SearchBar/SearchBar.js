import React from 'react';
import styles from './SearchBar.module.css';
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

function SearchBar({ searchParams, onSearchQueryChange, onSearch, products }) {

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === 'Return') {
      onSearch();
    }
  };

  return (
    <div className={styles['search-bar-container']}>
      <SearchIcon />
      <input
        type="text"
        placeholder="Search products..."
        className={styles['search-input']}
        value={searchParams.query}
        onChange={(e) => onSearchQueryChange(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      {products.length > 0 && <div className={styles.filterContainer}>
            <div><label htmlFor="sortOptionSelect" className={styles['sort-label']}>
            Sort:
          </label>
          <select 
            value={searchParams.sortOption} 
            onChange={(e) => {
              onSearchQueryChange(e.target.value, "sort");
            }} 
            className={styles['sort-select']}>
            <option value="title">Title</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select></div>
          <div><label htmlFor="sortOptionSelect" className={styles['sort-label']}>
            Order:
          </label>
          <select 
            value={searchParams.order} 
            onChange={(e) => {
              onSearchQueryChange(e.target.value, "order");
            }} 
            className={styles['sort-select']}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select></div>
      </div> }
    </div>
  );
}

export default SearchBar;
