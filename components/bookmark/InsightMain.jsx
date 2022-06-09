import { useQuery } from 'react-query';
import ReactWordcloud from 'react-wordcloud';
import { BookmarkCardList } from './BookmarkCardList';
import PropTypes from 'prop-types';
import { getInsights } from '../../api';

const options = {
  colors: [
    '#fffb8f',
    '#bae7ff',
    '#87e8de',
    '#adc6ff',
    '#d3adf7',
    '#ffadd2',
    '#eaff8f',
    '#ffd666',
  ],
  enableTooltip: false,
  deterministic: false,
  fontFamily: 'impact',
  fontSizes: [20, 60],
  padding: 1,
  rotations: 1,
  rotationAngles: [0],
  scale: 'sqrt',
  spiral: 'archimedean',
  transitionDuration: 1000,
};

function InsightMain({ bookmarkId }) {
  const {
    data: insightData,
    isLoading: insightLoading,
    isError: insightError,
  } = useQuery({
    key: `insight-${bookmarkId}`,
    queryFn: () => {
      return getInsights(bookmarkId);
    },
  });

  return (
    <>
      <div className="bg-zinc-700 rounded-3xl w-full xl:w-[1000px]">
        {!insightLoading && !insightError && insightData !== undefined && (
          <ReactWordcloud
            options={options}
            words={Object.entries(insightData?.data?.keywords).map(
              ([text, val]) => ({
                text,
                value: 10 * val,
              }),
            )}
          />
        )}
      </div>
      <div className="flex justify-center w-full">
        <div className="content-wrapper" id="bookmarks">
          {!insightLoading && !insightError && insightData !== undefined && (
            <BookmarkCardList
              bookmarkId={bookmarkId}
              insightMode
              bookmarks={insightData.data.recommends.map((recommend) => ({
                ...recommend,
                img: recommend.image,
              }))}
            />
          )}
        </div>
      </div>
    </>
  );
}

InsightMain.propTypes = {
  bookmarkId: PropTypes.string,
  insight: PropTypes.array,
};

export default InsightMain;
