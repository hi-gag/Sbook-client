import { Typography } from 'antd';

function Footer() {
  return (
    <footer className="bg-zinc-800 flex-col flex justify-center items-center">
      <div className="flex-col flex items-center py-4">
        <Typography.Text className="font-logo text-4xl">스북</Typography.Text>
        <Typography.Text>
          2022-1 한국외대 AI 융합전공 종합설계 B4조
        </Typography.Text>
        <Typography.Text>성산하 이연주 김종혁 박소연 김정수</Typography.Text>
      </div>
    </footer>
  );
}

export default Footer;
