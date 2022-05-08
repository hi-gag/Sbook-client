import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

function BookmarkList({ bookmarkListList }) {
  const router = useRouter();

  return (
    <section className="mb-8">
      <div className="flex">
        <div className="p-2 mr-4 bg-zinc-600 box font-bold underline">
          북마크 추가
        </div>
        <div className="container flex">
          {bookmarkListList.map((bookmarkListInfo) => (
            <div
              key={bookmarkListInfo.id}
              className="p-2 mr-4 bg-zinc-700 button box"
              onClick={() => router.push(`/bookmark/${bookmarkListInfo.id}`)}
            >
              {bookmarkListInfo.title}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .container {
          overflow: hidden;
          overflow-x: scroll;
          width: 800px;
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
};

export default BookmarkList;
