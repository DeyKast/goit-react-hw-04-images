import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SearchPhotos from './FetchAPI';
import Searchbar from './Searchbar';
import LoadMoreButton from './Button';
import ImageGalleryItem from './ImageGalleryItem';

import Loader from './Loader';
import Modal from './Modal';

import './css/styles.css';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    setIsLoading(true);
    SearchPhotos(searchValue, page)
      .then(({ hits, totalHits }) => {
        setItems(prevItems => [...prevItems, ...hits]);
        setShowMoreButton(page < Math.ceil(totalHits / 12));
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchValue, page]);

  const handleSubmit = query => {
    if (query === searchValue) {
      Notify.failure('Enter new query');
      return;
    }
    setPage(1);
    setItems([]);
    setSearchValue(query);
  };

  const handleButton = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleOpenModal = image => {
    setIsModalOpen(true);
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Searchbar handleSubmit={handleSubmit} />
      <div className="GalleryWrapper">
        <ul className="ImageGallery">
          <ImageGalleryItem items={items} openModal={handleOpenModal} />
        </ul>
        {showMoreButton && <LoadMoreButton handleButton={handleButton} />}
        {isLoading && <Loader />}
        {isModalOpen && (
          <Modal image={selectedImage} closeModal={handleCloseModal} />
        )}
      </div>
    </>
  );
};
