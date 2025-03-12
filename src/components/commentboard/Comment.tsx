import { FaChevronDown, FaChevronUp, FaRegPaperPlane, FaReply } from 'react-icons/fa6';
import { Comment, Reactions, Reply, User } from '../../lib/types';
import ProfileImage from '../ProfileImage';
import { useState } from 'react';
import ReplyItem from './Reply';
import { sendReply } from '../../lib/request/Reply';
import { addReaction } from '../../lib/ApiCalls/ReactionApiCalls';
import ReactionButton from '../reactions/ReactionButton';
import { Avatar } from '@mui/material';
import { grey } from '@mui/material/colors';
import { NavLink } from 'react-router';

// export default function Comment({ replies }: { replies?: boolean }) {
//     return (
//         <div className="w-full">
//             <div className="w-1 bg-backdropSecondary h-full rounded-b"></div>
//             <div className="flex justify-start">
//                 <ProfileImage className="scale-90 aspect-square"></ProfileImage>
//                 <div className="flex flex-col flex-grow">
//                     <h1 className="font-bold">Nev</h1>
//                     <p className="text-xs">@petykes</p>
//                 </div>
//                 <p className="text-xs justify-self-end">2001.09.11</p>
//             </div>
//             <div className="flex flex-col">
//                 <p className="bg-red-400 ml-24">buzi áááááááá</p>
//             </div>
//             <div>
//                 {replies ? (
//                     <div className="flex flex-row">
//                         <div className="w-12 flex-grow flex justify-center">

//                         </div>
//                         <Comment></Comment>
//                     </div>
//                 ) : (
//                     ""
//                 )}
//             </div>
//         </div>
//     );
// }

export default function CommentElement({ comment, preview, user }: {preview: boolean, user: User; comment: Comment }) {
  const [isReplying, setIsReplying] = useState(false);
  const [reply, setReply] = useState<string>('');
  const [currentReaction, setCurrentReaction] = useState<null | 'FIRE' | 'HEART' | 'COOL'>(comment.reactedWith);
  const [reactionState, setReactions] = useState<Reactions>({
    FIRE: comment.reactionTypeMap && comment.reactionTypeMap.FIRE ? comment.reactionTypeMap.FIRE : 0,
    HEART: comment.reactionTypeMap && comment.reactionTypeMap.HEART ? comment.reactionTypeMap.HEART : 0,
    COOL: comment.reactionTypeMap && comment.reactionTypeMap.COOL ? comment.reactionTypeMap.COOL : 0,
  });const [replies, setReplies] = useState<Reply[]>(comment.replies ? comment.replies : []);

  async function handleReply() {
    const res = await sendReply(comment.id, reply);

    if (res) {
      setReply('');
      setReplies([...replies, res]);
    } else console.error('Reply failed');
  }

  async function handlePress(type: null | 'FIRE' | 'HEART' | 'COOL') {
    if (currentReaction === type) {
      await addReaction('comment', comment.id, type);
      if (type) {
        setReactions({
          ...reactionState,
          [type]: reactionState[type] - 1,
        });
      }
      setCurrentReaction(null);
    } else {
      await addReaction('comment', comment.id!, type);
      setCurrentReaction(type);
      if (type) {
        setReactions({
          ...reactionState,
          [type]: reactionState[type] + 1,
        });
      }
    }
  }

  return (
    <div className="h-full w-full p-2">
      <div className="flex flex-row gap-2">
      <NavLink to={`/profile/${user.id}`} className={'mr-3'}>
        <Avatar sx={{ bgcolor: grey[800], width: 48, height: 48 }} src={user.profileImg}>
          {user.nickname.substring(0, 3).toUpperCase()}
        </Avatar>
      </NavLink>
        <div className="flex flex-row w-full">
          <div className="flex flex-col flex-grow">
            <h1 className="font-bold">{comment.user.nickname}</h1>
            <p className="text-xs">@{comment.user.username}</p>
          </div>
          <div className="flex flex-row gap-4 ml-auto items-center justify-items-end">
            <p className="text-xs">{comment.time.split('T')[0]}</p>
            <button
              onClick={() => {
                setIsReplying((isReplying) => !isReplying);
              }}
              className="secondary aspect-square flex justify-center items-center p-1 rounded-xl"
            >
              <FaReply className={`text-2xl ${isReplying ? 'text-highlightPrimary' : 'text-textColor'}`} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row ml-5">
        {replies && <div className="w-1 my-2 bg-backdropSecondary min-h-full rounded" />}
        <div className="flex flex-col w-full">
          <p className="text-sm break-all pl-6">{comment.text}</p>
          <div className="flex flex-row-reverse self-start gap-2 ml-3 items-center">
            {comment.replies && comment.replies.length > 0 && (
              <button
                className="primary rounded-xl items-center flex flex-row gap-2 m-2 w-fit px-2"
                onClick={() => setIsReplying(!isReplying)}
              >
                + {comment.replies?.length}
                {isReplying ? <FaChevronUp className="text-lg" /> : <FaChevronDown className="text-lg" />}
              </button>
            )}
            <div className='flex flex-row gap-2 items-center scale-90'>

             <ReactionButton
                initialReactionState={currentReaction}
                type="FIRE"
                state={currentReaction !== 'FIRE' ? 'inactive' : 'active'}
                count={reactionState.FIRE || 0}
                onClick={
                  !preview
                    ? async () => {
                        handlePress('FIRE');
                      }
                    : () => {}
                }
              />
              <ReactionButton
                initialReactionState={currentReaction}
                type="HEART"
                count={reactionState.HEART || 0}
                onClick={
                  !preview
                  ? async () => {
                    handlePress('HEART');
                  }
                    : () => {}
                }
                state={currentReaction !== 'HEART' ? 'inactive' : 'active'}
                />
              <ReactionButton
                initialReactionState={currentReaction}
                type="COOL"
                count={reactionState.COOL || 0}
                onClick={
                  !preview
                    ? async () => {
                        handlePress('COOL');
                      }
                      : () => {}
                    }
                    state={currentReaction !== 'COOL' ? 'inactive' : 'active'}
                    />
                    </div>
           </div>
          <div className="w-full pl-6 self-end">
            {isReplying && (
              <div className="flex flex-col my-2 gap-2">
                <div className="flex flex-row gap-2">
                  <ProfileImage className="aspect-square scale-90"></ProfileImage>
                  <input
                    type="text"
                    className="rounded-xl p-2 flex-grow w-full bg-backdropSecondary"
                    placeholder={'Válaszolj ' + comment.user.nickname + ' kommentjére'}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      handleReply();
                    }}
                    className="rounded-xl secondary p-2"
                  >
                    <FaRegPaperPlane className="text-2xl" />
                  </button>
                </div>
                {replies && replies.map((reply) => <ReplyItem preview={preview} reply={reply} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
