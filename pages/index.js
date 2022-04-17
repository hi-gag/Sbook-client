import Head from 'next/head';
import { Typography } from 'antd';

export default function Home() {
  return (
    <>
      <Head>
        <title>Sbook</title>
      </Head>
      <h1 className="text-2xl font-bold underline">랜딩 페이지</h1>
      <Typography.Text className="underline">텍스트는 이렇게</Typography.Text>
      <Typography.Paragraph>텍스트는 이렇게 해주세용</Typography.Paragraph>
    </>
  );
}
