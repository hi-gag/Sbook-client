import '../styles/initialize.css';
import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import Header from '../components/@layout/Header';
import Footer from '../components/@layout/Footer';
import { RecoilRoot } from 'recoil';
function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Header />
      <main className="px-32 py-8 min-h-screen bg-zinc-900">
        <Component {...pageProps} />
      </main>
      <Footer />
    </RecoilRoot>
  );
}

MyApp.propTypes = {
  Component: PropTypes.node,
  pageProps: PropTypes.any.isRequired,
};

export default MyApp;
