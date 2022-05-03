import { Space } from 'antd';
import Link from 'next/link';
import "antd/dist/antd.css";
import ModalBtn from '../form/ModalBtn';

function Header() {
  return (
    <header className="bg-zinc-800 flex justify-between items-center fixed w-full z-10">
      <Link href="/" passHref>
        <div className="p-4 cursor-pointer">
          <div className="font-logo text-3xl">스북</div>
        </div>
      </Link>

      <Space className="p-4" space={4}>
        <ModalBtn btnName={"로그인"} />
        <ModalBtn btnName={"회원가입"} />
      </Space>
    </header>
  );
}

export default Header;
