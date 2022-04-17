import '../styles/initialize.css';
import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import Header from '../components/@layout/Header';
import Footer from '../components/@layout/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main className="p-8 min-h-screen">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.node,
  pageProps: PropTypes.any.isRequired,
};

export default MyApp;
