import PropTypes from 'prop-types';
import Link from 'next/link';

function BookmarkList({ bookmarkListList }) {
  return (
    <section className="fixed top-18">
      <div>
        {bookmarkListList.map((bookmarkListInfo) => (
          <Link
            key={bookmarkListInfo.id}
            href={`/bookmark/${bookmarkListInfo.id}`}
          >
            <div className="p-4 bg-zinc-700 mt-4 rounded">
              {bookmarkListInfo.title}
            </div>
          </Link>
        ))}
      </div>
      <div className="p-4 bg-zinc-700 mt-12 rounded">북마크 추가</div>
    </section>
  );
}

BookmarkList.propTypes = {
  bookmarkListList: PropTypes.array.isRequired,
};

export default BookmarkList;
