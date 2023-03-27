import axios from "axios";
import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34227355-634b3cfb76d00133b4cb8e037';

const fetchImages = async (query, page) => {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await axios.get(url);

  if (response.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.hits.map(({ id, webformatURL, largeImageURL }) => ({
    id,
    webformatURL,
    largeImageURL,
  }));
};

const api = {fetchImages};

api.propTypes = {
  fetchImages: PropTypes.func.isRequired,
  };
  
export default api;