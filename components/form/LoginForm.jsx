import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import Router from 'next/router';
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

const LoginForm = () => {
  const [errMsg, setErrMsg] = useState(false);

  const submit = async (values) => {
    try {
      const {
        data: { data: token },
      } = await postLogin(values);

      localStorage.setItem('jwt', token);
      Router.push('/bookmark');
    } catch (e) {
      console.log(e);
      setErrMsg(true);
    }
  };

  const [form] = Form.useForm();

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={submit}
        // onFinish={onFinish}
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
          {errMsg && (
            <div className="mb-6">
              <div className="text-[#ff4d4f]">
                존재하지 않는 ID와 비밀번호입니다.
              </div>
              <div className="inline-block text-[#ff4d4f] mr-3">
                회원가입 하시겠습니까?
              </div>
              <a className="inline-block" href="">
                회원가입
              </a>
            </div>
          )}
          <Button type="primary" htmlType="submit">
            로그인
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
