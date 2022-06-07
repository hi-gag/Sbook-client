import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { bookmarkViewModeAtom } from '../../../atoms';
import { useState, useRef, useEffect } from 'react';
import BookmarkImportance from './BookmarkImportance';
import { putBookmark } from '../../../api';
import { useQueryClient } from 'react-query';

function BookmarkCard({ bookmarkId, bookmark, insightMode = false }) {
  const viewMode = useRecoilValue(bookmarkViewModeAtom);
  const [isMemoEditable, setIsMemoEditable] = useState(false);
  const queryClient = useQueryClient();

  const memoTextareaRef = useRef(null);

  useEffect(() => {
    if (memoTextareaRef.current && isMemoEditable) {
      memoTextareaRef.current.focus();
    }
  }, [isMemoEditable]);

  const handleMemoEditableButtonClick = () => {
    console.log(isMemoEditable)
    setIsMemoEditable((s) => !s);
    isMemoEditable ? changeMemo() : null;
  };

  const changeMemo = async () => {
    const token = window.localStorage.getItem('jwt') ?? '';
    const changedMemo = memoTextareaRef.current.value;

    await putBookmark(token, bookmark.id, {
      ...bookmark,
      memo: changedMemo,
    })

    queryClient.invalidateQueries(`bookmark-${bookmarkId}`);
  }

  const changeImportance = async (e) => {
    const token = window.localStorage.getItem('jwt') ?? '';
    const changedImportance = e.target.innerText;

    await putBookmark(token, bookmark.id, {
      ...bookmark,
      importance: changedImportance,
    })

    queryClient.invalidateQueries(`bookmark-${bookmarkId}`);
  }

  const removeBookmark = () => {
    console.log('remove');
    // 삭제 mutation
  };
  // console.log(bookmark);

  return (
    <article className="w-fit flex flex-col relative">
      <div className="rounded-t-3xl overflow-hidden h-36">
        {bookmark.image ? (
          <img className="h-auto" src={bookmark.image} alt="북마크 이미지" />
        ) : (
          <div className="bg-zinc-600 w-full h-full flex justify-center">
            <div className="font-logo text-5xl m-auto">스북</div>
          </div>
        )}
      </div>
      {!insightMode && (
        <div className="absolute top-3 left-3">
          <BookmarkImportance importance={bookmark.importance} handleImportance={changeImportance} />
        </div>
      )}
      {!insightMode && (
        <div
          className="absolute top-3 right-3 cursor-pointer"
          onClick={removeBookmark}
        >
          ❌
        </div>
      )}

      <div className="bg-zinc-800 px-4 py-2 h-2/4 rounded-b-3xl h-56">
        <a href={bookmark.url}>
          <div className="text-lg mb-2.5 font-bold leading-7 h-14">
            {bookmark.title}
          </div>
        </a>
        {viewMode === 'normal' ? (
          <div className="text-xs text-zinc-500 mb-2.5 h-20 min-h-fit">
            {bookmark.description}
          </div>
        ) : (
          <div className="bg-zinc-700 text-xs mb-2.5 h-20 min-h-fit p-2 opacity-50">
            {isMemoEditable ? (
              <textarea
                className="w-full h-full bg-zinc-700"
                defaultValue={bookmark.memo}
                ref={memoTextareaRef}
              />
            ) : (
              bookmark.memo
            )}
          </div>
        )}
        {!insightMode && (
          <div className="text-xs mb-2.5">
            {bookmark.keywords.map((keyword, index) => (
              <span key={index}>#{keyword} </span>
            ))}
          </div>
        )}

        {!insightMode && (
          <>
            {viewMode === 'normal' ? (
              <div className="text-xs text-zinc-500">
                추가된 날짜 : {bookmark.createdAt}
              </div>
            ) : (
              <div
                onClick={handleMemoEditableButtonClick}
                className="text-xs text-zinc-500 cursor-pointer"
              >
                {isMemoEditable ? '메모 수정 완료' : '🔖 메모 수정하기'}
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
}

BookmarkCard.propTypes = {
  bookmarkId: PropTypes.string,
  bookmark: PropTypes.object.isRequired,
  insightMode: PropTypes.bool,
};

export default BookmarkCard;
