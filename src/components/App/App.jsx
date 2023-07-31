import { useEffect, useState } from 'react';
import css from './App.module.css';
import { fetchImages } from '../services/api';
import Loader from '../Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import Notiflix from 'notiflix';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('largeImageURL');
  const [isButtonShown, setIsButtonShown] = useState(false);
  const [error, setError] = useState(null);
  const per_page = 12;

  const handleFormSubmit = searchValue => {
    setSearchValue(searchValue);
    setImages([]);
    setCurrentPage(1);
  };

  const onOpenModal = largeImageURL => {
    setIsOpen(true);
    setLargeImageURL(largeImageURL);
  };

  const onCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchData = () => {
      if (searchValue === '') return;
      setIsLoading(true);

      fetchImages(searchValue, currentPage)
        .then(({ hits, totalHits }) => {
          if (hits.length === 0) {
            Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }
          setImages(prevImages => [...prevImages, ...hits]);

          setIsButtonShown(currentPage < Math.ceil(totalHits / per_page));
        })
        .catch(error => setError(error))
        .finally(() => setIsLoading(false));
    };
    fetchData();
  }, [currentPage, searchValue, error]);

  const onLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onClick={onOpenModal} />
      {isOpen && (
        <Modal onCloseModal={onCloseModal} largeImageURL={largeImageURL} />
      )}
      {isLoading && <Loader />}
      {isButtonShown && <Button onClick={onLoadMore} />}
    </div>
  );
};

export default App;
