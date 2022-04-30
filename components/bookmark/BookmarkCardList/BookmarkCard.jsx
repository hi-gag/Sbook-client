import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { bookmarkViewModeAtom } from '../../../atoms';
import { useState, useRef, useEffect } from 'react';

function BookmarkCard({ bookmark }) {
  const viewMode = useRecoilValue(bookmarkViewModeAtom);
  const [isMemoEditable, setIsMemoEditable] = useState(false);

  const memoTextareaRef = useRef(null);

  useEffect(() => {
    if (memoTextareaRef.current && isMemoEditable) {
      memoTextareaRef.current.focus();
    }
  }, [isMemoEditable]);

  const handleMemoEditableButtonClick = () => {
    setIsMemoEditable((s) => !s);
  };

  return (
    <article className="w-fit flex flex-col">
      <a href={bookmark.url}>
        <div className="rounded-t-3xl overflow-hidden h-36">
          {bookmark.img ? (
            <img className="h-auto" src={bookmark.img} alt="북마크 이미지" />
          ) : (
            <div className="bg-zinc-600 w-full h-full flex justify-center">
              <div className="font-logo text-5xl m-auto">스북</div>
            </div>
          )}
        </div>
      </a>
      <div className="bg-zinc-800 px-4 py-2 h-2/4 rounded-b-3xl h-56">
        <div className="text-lg mb-2.5 font-bold leading-7 h-14">
          {bookmark.title}
        </div>
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

        <div className="text-xs mb-2.5">
          {bookmark.keywords.map((keyword, index) => (
            <span key={index}>#{keyword} </span>
          ))}
        </div>
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
      </div>
    </article>
  );
}

BookmarkCard.propTypes = {
  bookmark: PropTypes.object.isRequired,
};

export default BookmarkCard;
