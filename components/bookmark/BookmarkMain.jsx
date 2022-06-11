import { BookmarkCardList } from './BookmarkCardList';
import { BookmarkTitle } from './BookmarkTitle';
import { BookmarkList } from './BookmarkList';
import { BookmarkHeader } from './BookmarkTitle';
import { useQuery } from 'react-query';
import { getBookmarkList, getBookmark } from '../../api';
import PropTypes from 'prop-types';

function BookmarkMain({ bookmarkId }) {
  const isAuth = window.localStorage.getItem('jwt') !== undefined;

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
    enabled: isAuth,
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
    enabled: bookmarkId !== undefined,
    retry: 0,
  });

  if (!isAuth) {
    return (
      <div className="content-wrapper">
        <div>회원가입/로그인을 진행해주세요!</div>
      </div>
    );
  }

  return (
    <div className="content-wrapper">
      {!isBookmarkListListLoading &&
      !isBookmarkListListError &&
      bookmarkListList !== undefined ? (
        <BookmarkList
          bookmarkListList={bookmarkListList.data.data}
          bookmarkId={1}
        />
      ) : null}
      {isBookmarkListError && (
        <div className="content-wrapper">
          <div>권한이 없습니다</div>
        </div>
      )}
      {bookmarkId ? (
        <>
          {!isBookmarkListLoading && bookmarkList !== undefined ? (
            <>
              <BookmarkTitle
                title={bookmarkList.data.data.title}
                owner={bookmarkList.data.data.owner}
              />
              <BookmarkHeader
                bookmarkTitle={bookmarkList.data.data.title}
                shared={bookmarkList.data.data.isShared}
                bookmarkId={bookmarkId}
              />
              <BookmarkCardList
                bookmarkId={bookmarkId}
                bookmarks={bookmarkList.data.data.bookmarks}
              />
            </>
          ) : null}
        </>
      ) : (
        <div>상단의 북마크를 선택해주세요</div>
      )}
    </div>
  );
}

BookmarkMain.propTypes = {
  bookmarkId: PropTypes.string,
};

export default BookmarkMain;
