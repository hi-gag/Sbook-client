import { Space, Typography } from 'antd';

function Header() {
  return (
    <header className="bg-zinc-800 flex justify-between items-center fixed w-full z-10">
      <div className="p-4">
        <Typography.Text className="font-logo text-3xl">스북</Typography.Text>
      </div>
      <Space className="p-4" space={4}>
        <Typography.Text>로그인</Typography.Text>
        <Typography.Text>회원가입</Typography.Text>
      </Space>
    </header>
  );
}

export default Header;
