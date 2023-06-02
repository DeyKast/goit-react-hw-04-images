import React from 'react';

const ImageGalleryItem = ({ items, openModal }) => {
  return items.map(item => (
    <li className="ImageGalleryItem" key={item.id}>
      <img
        className="ImageGalleryItem-image"
        src={item.largeImageURL}
        alt={item.tags}
        onClick={() => openModal(item.largeImageURL)}
      />
    </li>
  ));
};

export default ImageGalleryItem;
