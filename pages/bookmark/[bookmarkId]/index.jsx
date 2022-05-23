import Head from 'next/head';
import PropTypes from 'prop-types';
import { mockBookmarkList, mockBookmarkListList } from '../../../mock';
import { BookmarkCardList } from '../../../components/bookmark/BookmarkCardList';
import { BookmarkTitle } from '../../../components/bookmark/BookmarkTitle';
import { BookmarkList } from '../../../components/bookmark/BookmarkList';
import BookmarkHeader from '../../../components/bookmark/BookmarkTitle/BookmarkHeader';
import { useQuery } from 'react-query';
import { getBookmarkList, getBookmark } from '../../../api';

export async function getServerSideProps(context) {
  const { bookmarkId } = context.query;
  return {
    props: {
      bookmarkId,
      bookmarkList: mockBookmarkList,
      bookmarkListList: mockBookmarkListList,
    },
  };
}

function BookmarkDetail({ bookmarkId }) {
  const {
    data: { results: bookmarkListList },
    isLoading: isBookmarkListListLoading,
    isError: isBookmarkListListError,
  } = useQuery({
    queryFn: () => {
      const token = window.localStorage?.jwt ?? '';
      return getBookmarkList(token);
    },
  });

  const {
    data: { data: bookmarkList },
    isLoading: isBookmarkListLoading,
    isError: isBookmarkListError,
  } = useQuery({
    queryFn: () => {
      const token = window.localStorage?.jwt ?? '';
      return getBookmark(token, bookmarkId);
    },
  });
  return (
    <>
      <Head>
        <title>{bookmarkId} 북마크</title>
      </Head>
      <div className="flex justify-center w-full mt-16 container">
        <div className="content-wrapper">
          {!isBookmarkListListLoading && !isBookmarkListListError && (
            <BookmarkList
              bookmarkListList={bookmarkListList}
              bookmarkId={bookmarkId}
            />
          )}
          {!isBookmarkListLoading && !isBookmarkListError && (
            <>
              <BookmarkTitle title={bookmarkList.title} />
              <BookmarkHeader shared={bookmarkList.is_shared} />
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
};

export default BookmarkDetail;
