import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import api from './api/api';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (query) {
      searchImages();
    }
  }, [query]);

  const searchImages = async () => {
    setLoading(true);

    try {
      const newImages = await api.fetchImages(query, page);
        setImages(prevImages => [...prevImages, ...newImages]);
        setPage(prevPage => prevPage + 1);
        setError(null);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
  };

  const handleSearchSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    searchImages();
  };

  const handleOpenModal = url => {
    setShowModal(true);
    setSelectedImage(url);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />

      {error && <p>{error}</p>}

      <ImageGallery images={images} onSelect={handleOpenModal} />

      {loading && <Loader />}

      {images.length > 0 && !loading && (
        <Button onClick={handleLoadMore} />
      )}

      {showModal && (
        <Modal
          largeImageURL={selectedImage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;