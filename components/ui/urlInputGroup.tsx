/* eslint-disable @next/next/no-img-element */
import { urlParesAtom, userAtom } from '@/atoms';
import { useAtom } from 'jotai';
import { useState } from 'react';

const UrlInputGroup = () => {
  const [user, setUser] = useAtom(userAtom);
  const [urlPares, setUrlPares] = useAtom(urlParesAtom);
  const [loading, setLoading] = useState(false);

  const [text, setText] = useState('');
  const handleClick = async () => {
    if (urlPares.length >= 5) {
      document.getElementById('pare-limit-modal')?.click();
      return;
    }
    setLoading(true);
    await fetch('/api/createurl', {
      method: 'POST',
      body: JSON.stringify({
        url: text,
        user: user,
      }),
    });
    setText('');

    await fetch('/api/getallurls', {
      method: 'POST',
      body: JSON.stringify({
        email: user?.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return setUrlPares(data);
      });
    setLoading(false);
  };

  return (
    <>
      <h1 className='text-white mb-5 text-xl md:text-4xl font-bold text-center'>
        Welcome
        <span className='avatar ml-3 mr-1 align-middle underline'>
          <div className='w-8 md:w-12 rounded-full drop-shadow-lg'>
            <img src={user?.image as string} alt='avater' />
          </div>
          {user?.name}
        </span>
      </h1>
      <div className='mb-5 mx-auto form-control drop-shadow-md'>
        <label className='input-group'>
          <input
            type='text'
            placeholder='http://example.com'
            className={`md:w-96 input ${loading && 'disabled'}`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleClick();
              }
            }}
          />
          <label
            className={`btn normal-case ${loading && 'loading'}`}
            onClick={handleClick}
          >
            Add
          </label>
        </label>
      </div>
    </>
  );
};

export default UrlInputGroup;
