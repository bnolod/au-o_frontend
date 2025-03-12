import { Avatar, Modal } from '@mui/material';
import { useState } from 'react';
import { FaRegComment, FaRegPaperPlane } from 'react-icons/fa6';
import { Comment, User } from '../../lib/types';
import CommentElement from './Comment';
import { AddCommentToPost } from '../../lib/request/Comment';
import { formatNumber } from '../../lib/functions';
import { NavLink } from 'react-router';
import { grey } from '@mui/material/colors';

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

  async function handleComment() {
    const res = await AddCommentToPost(postId, comment);
    if (res) {
      setComment('');
      setCommentList([...commentList, res]);
    } else console.error('Comment failed');
  }

  return (
    <div className="flex flex-row self-end shadow-[#00000044] hover:opacity-50 shadow-md">
      <button
        className="h-12 py-2 px-4 flex flex-row items-center gap-2 rounded-xl secondary px-2"
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
        <div className="bg-background flex flex-col p-3 rounded-xl w-2/3 h-2/3 overflow-y-scroll">
          <h1 className="self-center t2x">Kommentek</h1>

          <div className="m-4 flex items-center justify-between gap-1">
            <NavLink to={`/profile/${user.id}`} className={'mr-3'}>
              <Avatar sx={{ bgcolor: grey[800], width: 48, height: 48 }} src={user.profileImg}>
                {user.nickname.substring(0, 3).toUpperCase()}
              </Avatar>
            </NavLink>
            <input
              value={comment}
              onChange={(e) => setComment(e.currentTarget.value)}
              type="text"
              className="rounded-xl p-2 secondary flex-grow w-full"
              placeholder="Írj valamit"
            />
            <button className="rounded-xl secondary p-2" onClick={() => handleComment()}>
              <FaRegPaperPlane className="text-2xl" />
            </button>
          </div>
          <div className="flex flex-col overflow-y-scroll">
            {commentList.map((comment) => (
              <CommentElement preview={preview} user={user} comment={comment} />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
