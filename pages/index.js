import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const jwt = window.localStorage.getItem('jwt');
    const username = window.localStorage.getItem('username');

    if (jwt && username) {
      router.push('/bookmark');
    }
  }, []);

  return (
    <>
      <Head>
        <title>Sbook</title>
      </Head>
      <section className="w-full mt-20 flex-col justify-center align-center">
        <div className="text-6xl mb-4 text-center">🔖</div>
        <div className="text-4xl mb-2 font-bold text-center">
          북마크를 쉽게 작성하고 관리하세요
        </div>
        <div className="text-center">
          공유, 작성, 관심사 기반 유용한 인사이트와 추천까지
        </div>
      </section>
    </>
  );
}
