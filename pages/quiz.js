import Head from 'next/head';

export default function QuizPage() {
  return (
    <>
      <Head>
        <title>Quiz</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;800&display=swap" rel="stylesheet" />
      </Head>
      <iframe src="/quiz.html" style={{ width: '100%', height: '100vh', border: 'none' }} />
    </>
  );
}
