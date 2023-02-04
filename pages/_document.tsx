import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='bg-mainbg bg-fixed bg-cover'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
