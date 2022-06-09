import { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import BookmarkAddModal from './BookmarkAddModal';

function BookmarkList({ bookmarkListList, bookmarkId }) {
  const router = useRouter();

  const [isShowModal, setIsShowModal] = useState(false);

  const scrollRef = useRef(null);
  useLayoutEffect(() => {
    if (scrollRef.current) {
      const elem = bookmarkListList.find((item) => item.id === +bookmarkId);
      if (elem === undefined) return;

      const index = bookmarkListList.indexOf(elem);
      scrollRef.current.scrollTo({
        left: index * 200 - 10,
        behavior: 'smooth',
      });
    }
  }, [bookmarkId, bookmarkListList]);

  const closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <section className="mb-8 po-sticky bg-zinc-900 pb-4 pt-4">
      <div className="flex">
        <div
          className="p-2 mr-4 bg-zinc-600 box font-bold underline"
          onClick={() => {
            setIsShowModal(true);
          }}
        >
          북마크 리스트 추가
        </div>
        <BookmarkAddModal isVisible={isShowModal} handleClose={closeModal} />
        <div ref={scrollRef} className="container flex">
          {bookmarkListList.length === 0 ? (
            <div className="mt-2">버튼을 눌러 북마크를 추가해주세요</div>
          ) : (
            <>
              {bookmarkListList.map((bookmarkListInfo) => {
                const backgroundColor =
                  +bookmarkId === bookmarkListInfo.id
                    ? 'bg-zinc-700'
                    : 'bg-zinc-800';
                return (
                  <div
                    key={bookmarkListInfo.id}
                    className={`p-2 mr-4 button box ${backgroundColor}`}
                    onClick={() =>
                      router.push(`/bookmark/${bookmarkListInfo.id}`)
                    }
                  >
                    {bookmarkListInfo.title}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .container {
          overflow: hidden;
          overflow-x: scroll;
          width: 800px;
        }
        .po-sticky {
          position: sticky;
          top: 68px;
          z-index: 10;
        }
        .container::-webkit-scrollbar {
          display: none;
        }
        .box {
          min-width: 180px;
          text-align: center;
          border-radius: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .button {
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}

BookmarkList.propTypes = {
  bookmarkListList: PropTypes.array.isRequired,
  bookmarkId: PropTypes.string.isRequired,
};

export default BookmarkList;
