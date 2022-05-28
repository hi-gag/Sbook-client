import Head from 'next/head';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InsightMain from '../../../../components/bookmark/InsightMain';
import { getInsights } from '../../../../api';

export async function getServerSideProps(context) {
  const { bookmarkId } = context.query;
  const { data } = await getInsights(bookmarkId);

  return {
    props: {
      bookmarkId,
      insight: data,
    },
  };
}

function BookmarkInsight({ bookmarkId, insight }) {
  const [domLoad, setDomLoad] = useState(false);

  useEffect(() => {
    setDomLoad(true);
  }, []);

  return (
    <>
      <Head>
        <title>{bookmarkId} 북마크 인사이트</title>
      </Head>

      <div className="flex flex-col w-full items-center mt-16 container">
        {domLoad && <InsightMain insight={insight} bookmarkId={bookmarkId} />}
      </div>
      <style jsx>{`
        .container {
          min-height: 1300px;
          margin: 70px auto;
        }
      `}</style>
    </>
  );
}

BookmarkInsight.propTypes = {
  bookmarkId: PropTypes.string,
  bookmarkListList: PropTypes.array,
  insight: PropTypes.array,
};

export default BookmarkInsight;
