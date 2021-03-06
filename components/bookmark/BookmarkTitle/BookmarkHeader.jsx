import { Switch, Checkbox, Button, Input, Form } from 'antd';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import { bookmarkViewModeAtom } from '../../../atoms';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { postBookmarkTopic, postBookmark, putBookmarkList } from '../../../api';
import { useState } from 'react';

function BookmarkHeader({ shared, bookmarkId, bookmarkTitle }) {
  const router = useRouter();
  const [viewMode, setViewMode] = useRecoilState(bookmarkViewModeAtom);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [loadingFallback, setLoadingFallback] = useState('주소를 입력해주세요');

  const handleChange = () => {
    setViewMode((mode) => (mode === 'normal' ? 'memo' : 'normal'));
  };

  const submitNewBookmark = async () => {
    const { url } = form.getFieldValue();
    const token = window.localStorage.getItem('jwt') ?? '';
    setLoadingFallback('본문을 파싱하고 키워드를 도출합니다');

    try {
      const {
        data: { bookmarkListId, ...bookmarkBody },
      } = await postBookmarkTopic(bookmarkId, url);
      setLoadingFallback('도출한 키워드와 본문을 서버로 전달합니다');

      // 내용을 자바서버에 넘기기
      await postBookmark(token, bookmarkId, {
        ...bookmarkBody,
        importance: 1,
      });

      // 쿼리 리프레시(북마크 ID 필요함)
      queryClient.invalidateQueries(`bookmark-${bookmarkListId}`);
      setLoadingFallback('북마크 추가가 완료되었습니다');
    } catch (e) {
      setLoadingFallback('오류가 발생했습니다');
    }
    // 토픽서버에 URL 넘기기
  };

  const handleShareChange = async (e) => {
    const token = window.localStorage.getItem('jwt') ?? '';

    await putBookmarkList(token, bookmarkId, {
      title: bookmarkTitle,
      shared: e.target.checked,
    });
    queryClient.invalidateQueries('bookmarkList');
  };

  return (
    <section className="bg-zinc-900 w-full pt-8 pb-6 mb-4 flex justify-between align-center po-sticky">
      <div className="section-width">
        <Checkbox defaultChecked={shared} onChange={handleShareChange} />
        <span className="ml-2">공유 여부</span>
      </div>
      <div className="relative">
        <div className="absolute text-center top-100">{loadingFallback}</div>

        <Form
          className="flex space-between section-width"
          form={form}
          name="bookmark-list-create"
        >
          <Form.Item name="url">
            <Input ref placeholder="추가할 URL 입력" />
          </Form.Item>
          <Button className="ml-4" type="primary" onClick={submitNewBookmark}>
            입력
          </Button>
        </Form>
      </div>

      <div className="flex space-between justify-end section-width">
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
  bookmarkId: PropTypes.number.isRequired,
  bookmarkTitle: PropTypes.string.isRequired,
};

export default BookmarkHeader;
