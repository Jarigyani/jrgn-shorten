import { useState } from 'react';

type Props = {
  user?:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
  header: string;
};

const UrlInputGroup = ({ user, header }: Props) => {
  const [text, setText] = useState('');
  const handleClick = async () => {
    await fetch('/api/createurl', {
      method: 'POST',
      body: JSON.stringify({
        url: text,
        user: user,
      }),
    });
    setText('');
  };
  return (
    <div>
      <h1 className='text-xl md:text-4xl font-bold text-center'>{header}</h1>
      <div className='mx-auto w-max form-control'>
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
            value='Generate'
            onClick={handleClick}
          />
        </label>
      </div>
    </div>
  );
};

export default UrlInputGroup;
