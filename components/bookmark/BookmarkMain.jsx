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
    queryKey: 'bookmarkList',
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
    queryKey: `bookmark-${bookmarkId}`,
    queryFn: () => {
      const token = window.localStorage?.jwt ?? '';
      return getBookmark(token, bookmarkId);
    },
    enabled: bookmarkId !== undefined && bookmarkListList !== undefined,
  });

  const bookmarkTitle =
    bookmarkListList?.data?.data.find((element) => element.id === +bookmarkId)
      ?.title ?? '';

  return (
    <div className="content-wrapper">
      {!isBookmarkListListLoading &&
        !isBookmarkListListError &&
        bookmarkListList.data.data.length && (
          <BookmarkList
            bookmarkListList={bookmarkListList.data.data}
            bookmarkId={1}
          />
        )}
      {!isBookmarkListLoading &&
      !isBookmarkListError &&
      bookmarkId &&
      bookmarkList !== undefined ? (
        <>
          <BookmarkTitle
            title={bookmarkTitle}
            owner={bookmarkList.data.data.owner}
          />
          <BookmarkHeader
            shared={bookmarkList.data.data.isShared}
            bookmarkId={bookmarkId}
          />
          <BookmarkCardList bookmarkId={bookmarkId} bookmarks={bookmarkList.data.data.bookmarks} />
        </>
      ) : (
        <div>로딩</div>
      )}
    </div>
  );
}

BookmarkMain.propTypes = {
  bookmarkId: PropTypes.string,
};

export default BookmarkMain;
