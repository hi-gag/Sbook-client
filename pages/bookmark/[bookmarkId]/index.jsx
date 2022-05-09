import Head from 'next/head';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { mockBookmarkList, mockBookmarkListList } from '../../../mock';
import { BookmarkCardList } from '../../../components/bookmark/BookmarkCardList';
import { BookmarkTitle } from '../../../components/bookmark/BookmarkTitle';
import { BookmarkList } from '../../../components/bookmark/BookmarkList';
import BookmarkHeader from '../../../components/bookmark/BookmarkTitle/BookmarkHeader';

export async function getServerSideProps(context) {
  const { bookmarkId } = context.query;
  return {
    props: {
      bookmarkId,
      bookmarkList: mockBookmarkList[bookmarkId],
      bookmarkListList: mockBookmarkListList,
    },
  };
}

function BookmarkDetail({ bookmarkId, bookmarkList, bookmarkListList }) {
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

  return (
    <>
      <Head>
        <title>{bookmarkId} 북마크</title>
      </Head>
      <div className="flex justify-center w-full mt-16 container">
        <div className="content-wrapper">
          {!bookmarkList.shared && !auth.isAuth ? (
            <div>이 북마크는 공유되어 있지 않습니다</div>
          ) : (
            <>
              <BookmarkList
                bookmarkListList={bookmarkListList}
                bookmarkId={bookmarkId}
              />
              <BookmarkTitle title={bookmarkList.title} />
              <BookmarkHeader shared={bookmarkList.shared} />
              <BookmarkCardList bookmarks={bookmarkList.bookmarks} />
            </>
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
  bookmarkList: PropTypes.array,
  bookmarkListList: PropTypes.array,
};

export default BookmarkDetail;
