import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import api from './api/api';

class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    showModal: false,
    selectedImage: null,
    query: '',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.searchImages();
    }
  }

  searchImages = async () => {
    const { query, page } = this.state;

    this.setState({ loading: true });

    try {
      const images = await api.fetchImages(query, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        page: prevState.page + 1,
        error: null,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearchSubmit = query => {
    this.setState({ query, images: [], page: 1 });
  };

  handleLoadMore = () => {
    this.searchImages();
  };

  handleOpenModal = url => {
    this.setState({ showModal: true, selectedImage: url });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: null });
  };

  render() {
    const { images, loading, error, showModal, selectedImage } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />

        {error && <p>{error}</p>}

        <ImageGallery images={images} onSelect={this.handleOpenModal} />

        {loading && <Loader />}

        {images.length > 0 && !loading && (
          <Button onClick={this.handleLoadMore} />
        )}

        {showModal && (
          <Modal
            largeImageURL={selectedImage}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}

export default App;