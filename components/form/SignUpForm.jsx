import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
} from 'antd';
import "antd/dist/antd.css";
import axios from "axios";
import Router from 'next/router';

// antd 레이아웃
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


const SignUpForm = () => {
  const [errMsg, setErrMsg] = useState(false);

  // axios
  const submit = (values) => {
    const option = {
      method: "POST",
      url: "http://34.64.159.191:8081/user/signup",
      data: values,
    };
    axios(option)
    .then((res) => {
      console.log(res.data);
      const status = res.data.code;
      if (status === "200") { // 회원가입 성공, 토큰 저장
        const token = res.data.result.token;
        localStorage.setItem('jwt', token);
        Router.push('/bookmark')
      } 
      else if (status === "409") { // 중복회원 존재
        setErrMsg(true)
      }
    })
    .catch()
  };

  // form
  const [form] = Form.useForm();

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
          name="ID"
          label="아이디"
          rules={[
            {
              required: true,
              message: '아이디를 입력해주세요.',
            },
            {
              max: 15,
              message: '15자 이내의 아이디를 입력해주세요.',
            },
            {
              validator: () =>
                errMsg ? Promise.reject(new Error('중복된 아이디입니다.')) : Promise.resolve()
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
            {
              min: 10,
              message: '10자 이상의 비밀번호를 입력해주세요.',
            }
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

                return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="nickname"
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
            }
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

  )
}

export default SignUpForm

