import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tags, onSelect }) => (
  <li className="ImageGalleryItem" onClick={onSelect}>
    <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  };

export default ImageGalleryItem;