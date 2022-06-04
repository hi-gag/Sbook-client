import { BookmarkCardList } from './BookmarkCardList';
import { BookmarkTitle } from './BookmarkTitle';
import { BookmarkList } from './BookmarkList';
import { BookmarkHeader } from './BookmarkTitle';
import { useQuery } from 'react-query';
import { getBookmarkList, getBookmark } from '../../api';
import PropTypes from 'prop-types';

function BookmarkMain({ bookmarkId }) {
  const {
    data: bookmarkListList,
    isLoading: isBookmarkListListLoading,
    isError: isBookmarkListListError,
  } = useQuery({
    key: 'bookmarkList',
    queryFn: () => {
      const token = window.localStorage?.jwt ?? '';
      return getBookmarkList(token);
    },
  });

  const {
    data: bookmarkList,
    isLoading: isBookmarkListLoading,
    isError: isBookmarkListError,
  } = useQuery({
    key: `bookmark-${bookmarkId}`,
    queryFn: () => {
      const token = window.localStorage?.jwt ?? '';
      return getBookmark(token, bookmarkId);
    },
  });

  return (
    <div className="content-wrapper">
      {!isBookmarkListListLoading && !isBookmarkListListError && (
        <BookmarkList
          bookmarkListList={bookmarkListList.results}
          bookmarkId={bookmarkId}
        />
      )}
      {!isBookmarkListLoading && !isBookmarkListError && (
        <>
          <BookmarkTitle title={bookmarkList.data.title} />
          <BookmarkHeader
            shared={bookmarkList.data.is_shared}
            bookmarkId={bookmarkId}
          />
          <BookmarkCardList bookmarks={bookmarkList.data.bookmarks} />
        </>
      )}
    </div>
  );
}

BookmarkMain.propTypes = {
  bookmarkId: PropTypes.string,
};

export default BookmarkMain;
