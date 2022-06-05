import { useState, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { BookmarkList } from '../../components/bookmark/BookmarkList';
import { useQuery } from 'react-query';

function BookmarkDetail({ bookmarkId }) {
  const {
    data: bookmarkListList,
    isLoading: isBookmarkListListLoading,
    isError: isBookmarkListListError,
  } = useQuery('bookmarkList');
  
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

  return (
    <>
      <Head>
        <title>{bookmarkId} 북마크</title>
      </Head>
      <div className="flex justify-center w-full mt-16 container">
        <div className="content-wrapper">
          {auth.isAuth ? (
            <>
              {!isBookmarkListListLoading && !isBookmarkListListError && (
                <BookmarkList
                  bookmarkListList={bookmarkListList.data.data}
                  bookmarkId={bookmarkId}
                />
              )}
              <div className="text-center text-xl">
                상단의 북마크를 선택해주세요
              </div>
            </>
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
