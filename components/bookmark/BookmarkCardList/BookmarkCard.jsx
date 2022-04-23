import PropTypes from 'prop-types';

function BookmarkCard({ bookmark }) {
  return (
    <a className="min-w-fit" href={bookmark.url}>
      <article className="flex flex-col">
        <div className="rounded-t-3xl overflow-hidden h-36">
          {bookmark.img ? (
            <img className="h-auto" src={bookmark.img} alt="북마크 이미지" />
          ) : (
            <div className="bg-zinc-600 w-full h-full flex justify-center">
              <div className="font-logo text-5xl m-auto">스북</div>
            </div>
          )}
        </div>
        <div className="bg-zinc-800 px-4 py-2 h-2/4 rounded-b-3xl h-56">
          <div className="text-lg mb-2.5 font-bold leading-7 h-14">
            {bookmark.title}
          </div>
          <div className="text-xs text-zinc-500 mb-2.5 h-20 min-h-fit">
            {bookmark.description}
          </div>
          <div className="text-xs mb-2.5">
            {bookmark.keywords.map((keyword, index) => (
              <span key={index}>#{keyword} </span>
            ))}
          </div>
          <div className="text-xs text-zinc-500">
            추가된 날짜 : {bookmark.createdAt}
          </div>
        </div>
      </article>
    </a>
  );
}

BookmarkCard.propTypes = {
  bookmark: PropTypes.object.isRequired,
};

export default BookmarkCard;
