import Head from 'next/head';
import PropTypes from 'prop-types';
import { mockBookmarkList, mockBookmarkListList } from '../../../mock';
import { BookmarkCardList } from '../../../components/bookmark/BookmarkCardList';
import { BookmarkTitle } from '../../../components/bookmark/BookmarkTitle';
import { BookmarkList } from '../../../components/bookmark/BookmarkList';

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

function BookmarkDetail({ bookmarkId, bookmarkList, bookmarkListList }) {
  return (
    <>
      <Head>
        <title>{bookmarkId} 북마크</title>
      </Head>
      <div className="flex justify-center w-full mt-16">
        <div className="right">
          <BookmarkList bookmarkListList={bookmarkListList} />
          <BookmarkTitle
            title={bookmarkList.title}
            shared={bookmarkList.shared}
          />
          <BookmarkCardList bookmarks={bookmarkList.bookmarks} />
        </div>
      </div>
      <style jsx>{`
        .right {
          display: flex;
          flex-direction: column;
          align-items: center;
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
