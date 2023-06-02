import React from 'react';

const LoadMoreButton = ({ handleButton }) => {
  return (
    <button className="button" type="button" onClick={handleButton}>
      Load more
    </button>
  );
};

export default LoadMoreButton;
