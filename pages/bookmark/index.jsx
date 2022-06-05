import { useState, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import BookmarkMain from '../../components/bookmark/BookmarkMain';

function BookmarkDetail() {
  const [render, setRender] = useState(false);
  const [auth, setAuth] = useState({
    username: '',
    isAuth: false,
  });

  useEffect(() => {
    const jwt = window.localStorage.getItem('jwt');
    const username = window.localStorage.getItem('username');

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
        <title> 북마크</title>
      </Head>
      <div className="flex justify-center w-full mt-16 container">
        <div className="content-wrapper">
          {auth.isAuth && render ? (
            <BookmarkMain />
          ) : (
            <div className="text-center text-xl">로그인 해주세요</div>
          )}
        </div>
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
  bookmarkListList: PropTypes.array,
};

export default BookmarkDetail;
