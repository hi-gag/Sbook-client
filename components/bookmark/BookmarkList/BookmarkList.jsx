import PropTypes from 'prop-types';
import Link from 'next/link';

function BookmarkList({ bookmarkListList }) {
  return (
    <section className="container w-full">
      <div className="fixed top-20">
        <div className="w-250">
          {bookmarkListList.map((bookmarkListInfo) => (
            <Link
              key={bookmarkListInfo.id}
              href={`/bookmark/${bookmarkListInfo.id}`}
            >
              <div className="p-4 bg-zinc-700 mt-4 rounded button">
                {bookmarkListInfo.title}
              </div>
            </Link>
          ))}
        </div>
        <div className="p-4 bg-zinc-700 mt-12 rounded">북마크 추가</div>
      </div>
      <style jsx>{`
        .container {
          //width: 180px;
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
