import React from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { postLogin } from '../../api';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const LoginForm = ({ handleClose }) => {
  const router = useRouter();

  const [form] = Form.useForm();

  const submit = async () => {
    const values = form.getFieldValue();
    const { data } = await postLogin(values);

    window.localStorage.setItem('jwt', data.data.token);
    window.localStorage.setItem('username', data.data.username);

    handleClose();
    router.reload();
  };

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={submit}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="아이디"
          rules={[
            {
              required: true,
              message: '아이디를 입력해주세요.',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="비밀번호"
          rules={[
            {
              required: true,
              message: '비밀번호를 입력해주세요.',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            로그인
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

LoginForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default LoginForm;
