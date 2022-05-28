import Head from 'next/head';
import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { mockInsight } from '../../../../mockInsight';
import { mockBookmarkListList } from '../../../../mock';
import ReactWordcloud from 'react-wordcloud';
import { BookmarkCardList } from '../../../../components/bookmark/BookmarkCardList';
import { BookmarkList } from '../../../../components/bookmark/BookmarkList';

export async function getServerSideProps(context) {
  const { bookmarkId } = context.query;
  return {
    props: {
      bookmarkId,
      bookmarkListList: mockBookmarkListList,
      insight: mockInsight,
    },
  };
}

function BookmarkInsight({ bookmarkId, bookmarkListList, insight }) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const titleRefs = useRef([]);
  for (let i = 0; i < insight.keywords.length; i++) {
    titleRefs.current[i] = null;
  }

  const refIds = insight.keywords.reduce((result, item, idx) => {
    // refIds[id] == 해당 id 가진 element의 ref
    result[item] = titleRefs.current[idx];
    return result;
  }, {});

  const callbacks = {
    onWordClick: (word) => {
      if (insight.keywords.includes(word.text)) {
        // bigKeyword 클릭
        let targetElem = refIds[word.text];
        targetElem.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        let targetElem = refIds[keywords[word.text]]; // keywords[word.text] == 해당 word의 bigKeyword
        targetElem.current.scrollIntoView({ behavior: 'smooth' });
      }
      console.log(word);
    },
  };
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

  const keywords = insight.relatedUrl.reduce((result, i) => {
    let keys = [
      i.urls.map((item) => {
        return item.keywords;
      }),
    ].flat(2);
    keys.map((key) => {
      result[key] = i.keyword;
    });
    return result;
  }, {}); // 대분류 keyword를 찾을 수 있도록: keywords[smallKeyword] == bigKeyword
  // console.log(keywords)

  const bigKeywords = insight.keywords.map((i) => {
    return { text: i, value: 60 };
  });
  const smallKeywords = Object.keys(keywords).map((i) => {
    return { text: i, value: 10 };
  });
  const words = bigKeywords.concat(smallKeywords);

  return (
    <>
      <Head>
        <title>{bookmarkId} 북마크 인사이트</title>
      </Head>

      <div className="flex flex-col w-full items-center mt-16 container">
        <BookmarkList
          bookmarkListList={bookmarkListList}
          bookmarkId={bookmarkId}
        />
        <div className="bg-zinc-700 rounded-3xl w-full xl:w-[1000px]">
          {domLoaded && (
            <ReactWordcloud
              callbacks={callbacks}
              options={options}
              words={words}
            />
          )}
        </div>

        <div className="flex justify-center w-full">
          <div className="content-wrapper" id="bookmarks">
            {insight.relatedUrl.map((url, idx) => {
              return (
                <>
                  <div
                    className="h-[135px]"
                    id={url.keyword}
                    ref={titleRefs.current[idx]}
                  ></div>
                  <h2 className="text-white text-3xl font-bold mb-0 cursor-pointer">
                    #{url.keyword}
                  </h2>
                  <BookmarkCardList bookmarks={url.urls} />
                </>
              );
            })}
          </div>
        </div>
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
