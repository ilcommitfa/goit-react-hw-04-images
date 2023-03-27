import {ThreeDots} from 'react-loader-spinner';
import PropTypes from 'prop-types';

const Loader = () => {
  return (
    <div className="loader">
      <ThreeDots 
          height="80" 
          width="80" 
          radius="9"
          color="#4fa94d" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
      />
    </div>
  );
};

Loader.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  radius: PropTypes.number,
  color: PropTypes.string,
  ariaLabel: PropTypes.string,
  wrapperStyle: PropTypes.object,
  wrapperClassName: PropTypes.string,
  visible: PropTypes.bool,
  };

export default Loader;