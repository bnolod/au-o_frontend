import { Avatar, Modal } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { FaRegComment, FaRegPaperPlane } from 'react-icons/fa6';
import { Comment, User } from '../../lib/types';
import CommentElement from './Comment';
import { AddCommentToPost } from '../../lib/request/Comment';
import { formatNumber } from '../../lib/functions';
import { NavLink } from 'react-router';
import { grey } from '@mui/material/colors';
import { MdClose } from 'react-icons/md';

export default function CommentModal({
  preview,
  comments,
  user,
  language,
  postId,
}: {
  preview: boolean;
  user: User;
  language: 'EN' | 'HU';
  comments: Comment[];
  postId: number;
}) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState<string>('');
  const [commentList, setCommentList] = useState<Comment[]>(comments);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const latestRef = useRef<HTMLDivElement>(null);

  async function handleComment() {
    const res = await AddCommentToPost(postId, comment);
    if (res) {
      setComment('');
      setCommentList([...commentList, res]);
    } else console.error('Comment failed');
  }

  useEffect(() => {
    latestRef.current?.scrollIntoView();
  },[commentList])

  return (
    <div className="flex flex-row self-end shadow-[#00000044] hover:opacity-50 shadow-md">
      <button
        className="h-12 py-2 px-4 flex flex-row items-center gap-2 rounded-xl secondary"
        onClick={handleOpen}
      >
        {comments.length > 0 && <p className="flex txl flex-row">{formatNumber(comments.length, language)}</p>}
        <FaRegComment className="text-2xl" />
      </button>
      <Modal
        className="h-full w-full text-textColor flex flex-col justify-center items-center"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-background flex flex-col rounded-2xl w-full h-5/6 md:w-2/4 md:h-3/4 overflow-y-scroll">
        <div className='w-full flex flex-row p-4 justify-between bg-backdropSecondary'>
          <h1 className="self-center t2x">Comments
          </h1>
          <MdClose size={24} className='self-center text-textColor hover:opacity-50 cursor-pointer' onClick={handleClose}></MdClose>
          </div>
          <div className="flex flex-col-reverse overflow-y-scroll flex-1 p-4">
            {commentList.map((comment) => (
              <CommentElement preview={preview} user={user} comment={comment} />
            ))}
            <div ref={latestRef}></div>
          </div>
          <div className="px-2 py-2 flex items-center bg-backdropPrimary justify-between gap-1">
            <NavLink to={`/profile/${user.id}`} className={''}>
              <Avatar sx={{ bgcolor: grey[800] }} src={user.profileImg}>
                {user.nickname.substring(0, 3).toUpperCase()}
              </Avatar>
            </NavLink>
            <input
              value={comment}
              onChange={(e) => setComment(e.currentTarget.value)}
              type="text"
              className="rounded-xl p-2 secondary flex-grow w-full"
              placeholder="Comment something..."
            />
            <button className="rounded-xl secondary p-2" onClick={() => handleComment()}>
              <FaRegPaperPlane className="text-2xl" />
            </button>
          </div>
          
        </div>
      </Modal>
    </div>
  );
}
