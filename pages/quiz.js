import Head from 'next/head';
import dynamic from 'next/dynamic';

const Quiz = dynamic(() => import('../components/Quiz'), { ssr: false });

export default function QuizPage() {
  return (
    <>
      <Head>
        <title>Quiz</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;800&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Quiz />
    </>
  );
}
