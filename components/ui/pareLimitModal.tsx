const PareLimitModal = () => {
  return (
    <>
      <input type='checkbox' id='pare-limit-modal' className='modal-toggle' />
      <div className='top-0 modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Upper limit reached!</h3>
          <p className='py-4'>
            You can generate up to 5 short URLs per account Please delete any of
            them before adding a new one.
          </p>
          <div className='modal-action'>
            <label htmlFor='pare-limit-modal' className='btn'>
              OK
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default PareLimitModal;
