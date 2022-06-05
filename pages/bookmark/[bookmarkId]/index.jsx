import Head from 'next/head';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BookmarkMain from '../../../components/bookmark/BookmarkMain';

export async function getServerSideProps(context) {
  const { bookmarkId } = context.query;
  return {
    props: {
      bookmarkId,
    },
  };
}

function BookmarkDetail({ bookmarkId }) {
  const [render, setRender] = useState(false);
  const [auth, setAuth] = useState({
    username: '',
    isAuth: false,
  });

  useEffect(() => {
    const jwt = window.sessionStorage.getItem('jwt');
    const username = window.sessionStorage.getItem('username');

    setAuth({
      username,
      isAuth: jwt != null,
    });
  }, []);

  useEffect(() => {
    setRender(true);
  }, []);

  return (
    <>
      <Head>
        <title>{bookmarkId} 북마크</title>
      </Head>
      <div className="flex justify-center w-full mt-16 container">
        {render && auth && <BookmarkMain bookmarkId={bookmarkId} />}
      </div>
      <style jsx>{`
        .container {
          min-height: 1300px;
          margin: 70px auto;
        }
      `}</style>
    </>
  );
}

BookmarkDetail.propTypes = {
  bookmarkId: PropTypes.string,
};

export default BookmarkDetail;
