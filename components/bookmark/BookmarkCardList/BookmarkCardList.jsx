import PropTypes from 'prop-types';
import BookmarkCard from './BookmarkCard';

function BookmarkCardList({ bookmarks }) {
  return (
    <section className="grid gap-4 grid-cols-3 ">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </section>
  );
}

BookmarkCardList.propTypes = {
  bookmarks: PropTypes.array.isRequired,
};

export default BookmarkCardList;
