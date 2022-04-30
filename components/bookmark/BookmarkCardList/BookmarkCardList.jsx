import PropTypes from 'prop-types';
import BookmarkCard from './BookmarkCard';

function BookmarkCardList({ bookmarks }) {
  return (
    <section className="grid gap-4 grid-cols-3 container">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
      <style jsx>{`
        .container {
          min-width: 1000px;
          max-width: 1200px;
        }
      `}</style>
    </section>
  );
}

BookmarkCardList.propTypes = {
  bookmarks: PropTypes.array.isRequired,
};

export default BookmarkCardList;
