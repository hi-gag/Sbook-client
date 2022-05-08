import PropTypes from 'prop-types';

function BookmarkTitle({ title }) {
  return (
    <section className="container ">
      <div className="h-64 flex justify-center">
        <div className="flex flex-col align-center justify-center">
          <div className="text-4xl font-bold mb-4 text-center">{title}</div>
          <div className="h-4 text-center">작성자: 누구누구</div>
        </div>
      </div>
      <style jsx>{`
        .container {
          min-width: 800px;
          max-width: 1000px;
        }
      `}</style>
    </section>
  );
}

BookmarkTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BookmarkTitle;
