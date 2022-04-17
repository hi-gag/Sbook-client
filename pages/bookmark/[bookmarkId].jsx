import Head from 'next/head';
import PropTypes from 'prop-types';

export async function getServerSideProps(context) {
  const { bookmarkId } = context.query;
  return {
    props: { bookmarkId },
  };
}

function BookmarkDetail({ bookmarkId }) {
  return (
    <>
      <Head>
        <title>{bookmarkId} 북마크</title>
      </Head>
      <h1 className="text-3xl font-bold underline">북마크 디테일 페이지</h1>
      <p>{bookmarkId}</p>
    </>
  );
}

BookmarkDetail.propTypes = {
  bookmarkId: PropTypes.string,
};

export default BookmarkDetail;
