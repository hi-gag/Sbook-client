import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { postSignUp } from '../../api';

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

const SignUpForm = ({ handleClose }) => {
  const router = useRouter();
  const [form] = Form.useForm();

  const submit = async () => {
    const { username, password, email } = form.getFieldValue();

    const { data } = await postSignUp({
      email,
      password,
      username,
    });

    localStorage.setItem('jwt', data.data.token);
    localStorage.setItem('username', data.data.username);

    handleClose();
    router.reload('/bookmark');
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
          label="이메일"
          rules={[
            {
              required: true,
              message: '이메일을 입력해주세요.',
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

        <Form.Item
          name="confirm"
          label="비밀번호 확인"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '비밀번호를 입력해주세요.',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error('비밀번호가 일치하지 않습니다.'),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="username"
          label="닉네임"
          rules={[
            {
              required: true,
              message: '닉네임을 입력해주세요.',
              whitespace: true,
            },
            {
              max: 10,
              message: '10자 이하의 닉네임을 입력해주세요.',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

SignUpForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default SignUpForm;
