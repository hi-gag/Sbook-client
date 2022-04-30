import Head from 'next/head';
import PropTypes from 'prop-types';

export async function getServerSideProps(context) {
  const { bookmarkId } = context.query;
  return {
    props: {
      bookmarkId,
    },
  };
}

function BookmarkInsight({ bookmarkId }) {
  return (
    <>
      <Head>
        <title>{bookmarkId} 북마크 인사이트</title>
      </Head>
      <div className="flex w-full mt-16">북마크 인사이트</div>
    </>
  );
}

BookmarkInsight.propTypes = {
  bookmarkId: PropTypes.string,
};

export default BookmarkInsight;
