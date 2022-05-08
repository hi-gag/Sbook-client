import { Switch, Checkbox, Button } from 'antd';
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
    <section className="bg-zinc-900 w-full pt-2 pb-2 flex justify-between align-center  po-sticky">
      <div className="flex justify-between">
        <Checkbox defaultChecked={shared} />
        <div className="ml-2">공유 여부</div>
      </div>
      <div className="flex align-center">
        <div className="mr-4">
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
        .po-sticky {
          position: sticky;
          top: 68px;
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
