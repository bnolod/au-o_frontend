import { Modal } from '@mui/material';
import { useState } from 'react';

export default function CommentModal(comments: Comment[]) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className=''>
            <button onClick={handleOpen}>nyid ki</button>
      <Modal className='h-full w-full flex flex-col justify-center items-center'
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='bg-background'>hweslkfnesfl modal</div>
      </Modal>
    </div>
  );
}
