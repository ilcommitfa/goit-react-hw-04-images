import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, onSelect }) => (
  <li className="ImageGalleryItem" onClick={onSelect}>
    <img src={webformatURL} alt="" className="ImageGalleryItem-image" />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ImageGalleryItem;