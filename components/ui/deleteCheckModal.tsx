import { urlAtom, urlParesAtom } from '@/atoms';
import { useAtom } from 'jotai';

const DeleteCheckModal = () => {
  const [urlPares, setUrlPares] = useAtom(urlParesAtom);
  const [pare, setPare] = useAtom(urlAtom);
  const handleClick = async () => {
    try {
      await fetch('/api/deletepare', {
        method: 'POST',
        body: JSON.stringify({
          id: pare?.id,
        }),
      });
    } catch (err) {
      console.log(err);
      return;
    }
    setUrlPares(urlPares.filter((p) => p.id !== pare?.id));
  };

  return (
    <>
      <input type='checkbox' id='my-modal' className='modal-toggle' />
      <div className='top-0 modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>
            Do you really want to delete it?
          </h3>
          <p className='py-4'>
            URLs already in use will no longer be accessible, and the same URLs
            cannot be generated again
          </p>
          <div className='modal-action'>
            <label htmlFor='my-modal' className='btn'>
              Cancel
            </label>
            <label
              htmlFor='my-modal'
              className='btn btn-error'
              onClick={handleClick}
            >
              Delete
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteCheckModal;
