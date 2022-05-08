import { Switch, Checkbox, Button, Input } from 'antd';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import { bookmarkViewModeAtom } from '../../../atoms';
import Link from 'next/link';
import { useRouter } from 'next/router';

function BookmarkHeader({ shared }) {
  const router = useRouter();
  const [viewMode, setViewMode] = useRecoilState(bookmarkViewModeAtom);

  const handleChange = () => {
    setViewMode((mode) => (mode === 'normal' ? 'memo' : 'normal'));
  };
  return (
    <section className="bg-zinc-900 w-full pt-8 pb-6 mb-4 flex justify-between align-center po-sticky">
      <div className="section-width">
        <Checkbox defaultChecked={shared} />
        <span className="ml-2">공유 여부</span>
      </div>

      <div className="flex space-between section-width">
        <Input placeholder="추가할 URL 입력" />
        <div className="ml-2">
          <Button type="primary">입력</Button>
        </div>
      </div>

      <div className="flex space-between justify-end section-width">
        <div className="mr-4 m-auto">
          <Switch
            onChange={handleChange}
            defaultChecked={viewMode === 'memo'}
            checkedChildren={<div>메모 뷰</div>}
            unCheckedChildren={<div>기본 뷰</div>}
          />
        </div>
        <Link href={`/bookmark/${router.query.bookmarkId}/insight`} passHref>
          <Button type="primary">인사이트</Button>
        </Link>
      </div>
      <style jsx>{`
        .section-width {
          width: 33.3%;
        }
        .po-sticky {
          position: sticky;
          top: 124px;
          z-index: 10;
        }
      `}</style>
    </section>
  );
}

BookmarkHeader.propTypes = {
  shared: PropTypes.bool.isRequired,
};

export default BookmarkHeader;
