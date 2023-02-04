import { urlAtom } from '@/atoms';
import { UrlPare } from '@prisma/client';
import { useAtom } from 'jotai';

type Props = {
  pare: UrlPare;
};

const DeleteButton = ({ pare }: Props) => {
  const [url, setUrl] = useAtom(urlAtom);
  return (
    <div className='overflow-'>
      <label
        htmlFor='my-modal'
        className='btn-error btn'
        onClick={() => {
          setUrl(pare);
        }}
      >
        Delete
      </label>
    </div>
  );
};

export default DeleteButton;
