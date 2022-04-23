import { Space } from 'antd';

function Header() {
  return (
    <header className="bg-zinc-800 flex justify-between items-center fixed w-full z-10">
      <div className="p-4">
        <div className="font-logo text-3xl">스북</div>
      </div>
      <Space className="p-4" space={4}>
        <div>로그인</div>
        <div>회원가입</div>
      </Space>
    </header>
  );
}

export default Header;
