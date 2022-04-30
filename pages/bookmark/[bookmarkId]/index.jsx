import Head from 'next/head';
import PropTypes from 'prop-types';
import { mockBookmarkList, mockBookmarkListList } from '../../../mock';
import { BookmarkCardList } from '../../../components/bookmark/BookmarkCardList';
import { BookmarkList } from '../../../components/bookmark/BookmarkList';
import { BookmarkTitle } from '../../../components/bookmark/BookmarkTitle';

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
      <div className="flex w-full mt-16">
        <div className="left">
          <BookmarkList bookmarkListList={bookmarkListList} />
        </div>
        <div className="right">
          <BookmarkTitle
            title={bookmarkList.title}
            shared={bookmarkList.shared}
          />
          <BookmarkCardList bookmarks={bookmarkList.bookmarks} />
        </div>
      </div>
      <style jsx>{`
        .left {
          width: 20%;
        }
        .right {
          width: 80%;
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
