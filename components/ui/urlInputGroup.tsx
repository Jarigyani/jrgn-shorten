import { urlParesAtom, userAtom } from '@/atoms';
import { useAtom } from 'jotai';
import { useState } from 'react';

const UrlInputGroup = () => {
  const [user, setUser] = useAtom(userAtom);
  const [urlPares, setUrlPares] = useAtom(urlParesAtom);

  const [text, setText] = useState('');
  const handleClick = async () => {
    if (urlPares.length >= 5) {
      return alert(
        'You can only have 5 URLs at a time. Delete one to add another.'
      );
    }
    await fetch('/api/createurl', {
      method: 'POST',
      body: JSON.stringify({
        url: text,
        user: user,
      }),
    });
    setText('');

    fetch('/api/getallurls', {
      method: 'POST',
      body: JSON.stringify({
        email: user?.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return setUrlPares(data);
      });
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
            className='md:w-96 input input-bordered'
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleClick();
              }
            }}
          />
          <input
            type='button'
            className='btn normal-case'
            value='Add'
            onClick={handleClick}
          />
        </label>
      </div>
    </>
  );
};

export default UrlInputGroup;
