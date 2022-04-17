import '../styles/font.css';
import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.propTypes = {
  Component: PropTypes.node,
  pageProps: PropTypes.any.isRequired,
};

export default MyApp;
