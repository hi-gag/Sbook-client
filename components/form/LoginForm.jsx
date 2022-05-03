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

const LoginForm = () => {
  const [errMsg, setErrMsg] = useState(false);

  // axios
  const submit = (values) => {
    const option = {
      method: "POST",
      url: "http://34.64.159.191:8081/user/login",
      data: values,
    };
    axios(option)
    .then((res) => {
      console.log(res.data);
      const status = res.data.code;
      if (status === "200") { // 로그인 성공, 토큰 저장
        const token = res.data.data.token;
        localStorage.setItem('jwt', token);
        Router.push('/bookmark')
      } 
      else if (status === "401") { // 존재하지 않는 아이디 비번
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
          {errMsg && 
            <div className="mb-6">
              <div className='text-[#ff4d4f]'>존재하지 않는 ID와 비밀번호입니다.</div>
              <div className="inline-block text-[#ff4d4f] mr-3">회원가입 하시겠습니까?</div>
              <a className="inline-block" href="">회원가입</a>
            </div>}
          <Button type="primary" htmlType="submit">
            로그인
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default LoginForm