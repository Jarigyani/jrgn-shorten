const EmptyModal = () => {
  return (
    <>
      <input type='checkbox' id='empty-modal' className='modal-toggle' />
      <div className='top-0 modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Textbox is empty</h3>
          <p className='py-4'>Please enter the URL you wish to shorten.</p>
          <div className='modal-action'>
            <label htmlFor='empty-modal' className='btn'>
              OK
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyModal;
