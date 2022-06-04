import { Modal, Button, Input, Form, Switch } from 'antd';
import PropTypes from 'prop-types';
import { postBookmarkLists } from '../../../api';
import { useQueryClient } from 'react-query';

function BookmarkAddModal({ isVisible, handleClose }) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const submit = async () => {
    const { title, shared } = form.getFieldValue();
    const token = window.localStorage.getItem('jwt') ?? '';
    try {
      //TODO 서버에서 ID 발급하면 수정
      await postBookmarkLists(token, { id: '임의값', title, shared });
      queryClient.invalidateQueries('bookmarkList');
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Modal title="북마크 리스트 추가" visible={isVisible} footer="">
      <Form
        form={form}
        name="bookmark-list-create"
        onFinish={submit}
        scrollToFirstError
      >
        <Form.Item
          name="title"
          label="북마크 리스트 제목"
          rules={[
            {
              required: true,
              message: '북마크 리스트를 입력해주세요',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="shared" valuePropName="checked" label="공유 여부">
          <Switch />
        </Form.Item>
      </Form>
      <div>
        <Button className="mr-5" type="primary" onClick={submit}>
          입력
        </Button>
        <Button type="primary" onClick={handleClose}>
          닫기
        </Button>
      </div>
    </Modal>
  );
}

BookmarkAddModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default BookmarkAddModal;
