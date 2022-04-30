import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import { useState } from 'react';

const importanceColor = [
  'none',
  '#F3FFF8',
  '#00FF66',
  '#FFF500',
  '#FF7A00',
  '#FF0000',
];

function BookmarkImportance({ importance }) {
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  return (
    <Tooltip
      onMouseLeave={() => {
        setIsUpdateMode(false);
      }}
      title={
        isUpdateMode ? (
          <div className="flex space-evenly align-center">
            {importanceColor.map((color, id) =>
              color !== 'none' ? (
                <div
                  key={id}
                  className="w-4 h-4 mr-2 cursor-pointer text-xs text-center text-black"
                  style={{
                    backgroundColor: importanceColor[id],
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                  }}
                >
                  {id}
                </div>
              ) : null,
            )}
            <div
              className="text-sky-200 cursor-pointer text-xs"
              onClick={() => {
                setIsUpdateMode(false);
              }}
            >
              취소
            </div>
          </div>
        ) : (
          <div>
            중요도 {importance}{' '}
            <span
              className="text-sky-200 cursor-pointer "
              onClick={() => {
                setIsUpdateMode(true);
              }}
            >
              수정하기
            </span>
          </div>
        )
      }
      placement="right"
    >
      <div className="importance current-importance">
        <style jsx>{`
          .modify {
            color: blue;
          }

          .importance {
            width: 15px;
            height: 15px;
            border-radius: 50%;
          }

          .current-importance {
            background-color: ${importanceColor[importance]};
          }
        `}</style>
      </div>
    </Tooltip>
  );
}

BookmarkImportance.propTypes = {
  importance: PropTypes.number.isRequired,
};

export default BookmarkImportance;
