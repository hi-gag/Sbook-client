import { Button, Input } from 'antd';
import PropTypes from 'prop-types';
import BookmarkHeader from './BookmarkHeader';

function BookmarkTitle({ title, shared }) {
  return (
    <section className="container">
      <BookmarkHeader shared={shared} />
      <div className="h-64 flex justify-center">
        <div className="flex flex-col align-center justify-center">
          <div className="text-4xl font-bold mb-4 text-center">{title}</div>
          <div className="flex">
            <div className="w-96">
              <Input placeholder="여기에 북마크 유알엘 입력" />
            </div>
            <div className="ml-4">
              <Button type="primary">입력</Button>
            </div>
          </div>
          <div className="h-4">문구</div>
        </div>
      </div>
      <style jsx>{`
        .container {
          min-width: 1000px;
          max-width: 1200px;
        }
      `}</style>
    </section>
  );
}

BookmarkTitle.propTypes = {
  title: PropTypes.string.isRequired,
  shared: PropTypes.bool.isRequired,
};

export default BookmarkTitle;
