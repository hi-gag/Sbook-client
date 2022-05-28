import PropTypes from 'prop-types';
import BookmarkCard from './BookmarkCard';

function BookmarkCardList({ bookmarks, insightMode }) {
  // todo id 받아서 토픽서버 키워드 받아오기
  return (
    <section className="grid gap-4 grid-cols-3 container pt-12">
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          insightMode={insightMode}
        />
      ))}
      <style jsx>{`
        .container {
          min-width: 800px;
          max-width: 1000px;
        }
      `}</style>
    </section>
  );
}

BookmarkCardList.propTypes = {
  bookmarks: PropTypes.array.isRequired,
  insightMode: PropTypes.bool,
};

export default BookmarkCardList;
