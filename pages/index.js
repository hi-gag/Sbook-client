import Head from 'next/head';
import { Typography, Button, Switch, Input, Space, Card } from 'antd';

export default function Home() {
  return (
    <>
      <Head>
        <title>Sbook</title>
      </Head>
      <h1 className="text-2xl font-bold underline">랜딩 페이지</h1>
      <div className="underline">텍스트는 이렇게</div>
      <div>antd에서 그대로 쓸수 있는거 목록</div>
      <Space className="w-64" direction="vertical" space={10}>
        <Button type="primary">버튼</Button>
        <Switch checkedChildren="켜짐" unCheckedChildren="꺼짐" />
        <Input value="인풋" />
        {/* 카드는 하나 새로 만들어야댐 */}
      </Space>
    </>
  );
}
