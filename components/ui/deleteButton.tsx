import { urlParesAtom } from '@/atoms';
import { UrlPare } from '@prisma/client';
import { useAtom } from 'jotai';

type Props = {
  pare: UrlPare;
};

const DeleteButton = ({ pare }: Props) => {
  const [urlPares, setUrlPares] = useAtom(urlParesAtom);
  const handleClick = async () => {
    try {
      await fetch('/api/deletepare', {
        method: 'POST',
        body: JSON.stringify({
          id: pare.id,
        }),
      });
    } catch (err) {
      console.log(err);
      return;
    }
    setUrlPares(urlPares.filter((p) => p.id !== pare.id));
  };
  return (
    <>
      <button className='btn btn-error' onClick={handleClick}>
        Delete
      </button>
    </>
  );
};

export default DeleteButton;
