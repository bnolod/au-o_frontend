import { User } from '../../lib/types';
import { addReaction } from '../../lib/apiClient';
import { useState, useEffect } from 'react';
import CommentModal from '../commentboard/CommentModal';
import { formatNumber } from '../../lib/functions';
import { Icon } from '@mui/material';
import { MdLocationPin } from 'react-icons/md';
import { Post } from '../../lib/entity/Post';

export default function PostReactionBar({
  preview,
  post,
  user,
  language,
}: {
  preview: boolean;
  user: User;
  post: Post;
  language: 'HU' | 'EN';
}) {
  const typeMap = {
    FIRE: post.reactionTypeMap ? post.reactionTypeMap.FIRE : 0,
    COOL: post.reactionTypeMap !== null ? post.reactionTypeMap.COOL : 0,
    HEART: post.reactionTypeMap ? post.reactionTypeMap.HEART : 0,
  };
  const [addedReaction, setAddedReaction] = useState<'FIRE' | 'COOL' | 'HEART' | null>(post.reactedWith);
  function handleReaction(reaction: 'FIRE' | 'COOL' | 'HEART' | null) {
    if (addedReaction === reaction) {
      if (reaction != null) {
        setAddedReaction(null);
        typeMap[reaction] -= 1;
      } else {
        setAddedReaction(null);
      }
    } else {
      setAddedReaction(reaction);
      typeMap[reaction!] += 1;
    }
  }

  useEffect(() => {
    console.log('postReactionBar', addedReaction);
  }, [addedReaction]);
  return (
    <div
      key={addedReaction ? addedReaction : 'NONE' + post.postId}
      className="flex text-xs flex-row p-3 justify-between bg-background"
    >
      <button
        key={addedReaction ? addedReaction : 'NONE' + post.postId}
        className={`outline-highlightPrimary aspect-square justify-center h-12 items-center flex flex-row text-xl    p-2 mx-1 rounded-2xl shadow-[#00000044] hover:opacity-50 active:hover:opacity-100 shadow-md disabled:opacity-50 ${
          addedReaction === 'FIRE' ? 'bg-highlightSecondary' : 'bg-backdropSecondary'
        }`}
        onClick={() => {
          handleReaction('FIRE');
          addReaction('FIRE', 'post', post.postId);
        }}
        disabled={addedReaction !== 'FIRE' && addedReaction !== null}
      >
        <p>🔥 </p>
        <p>{typeMap.FIRE ? formatNumber(typeMap.FIRE, language) : ''}</p>

  
      </button>
      <button
        className={`outline-highlightPrimary aspect-square justify-center h-12 items-center flex flex-row text-xl   bg-backdropSecondary p-2 mx-1 rounded-2xl shadow-[#00000044] hover:opacity-50 active:hover:opacity-100 shadow-md disabled:opacity-50 ${
          addedReaction === 'COOL' ? 'bg-highlightSecondary' : 'bg-backdropSecondary'
        }`}
        onClick={() => {
          handleReaction('COOL');
          addReaction('COOL', 'post', post.postId);
        }}
        disabled={addedReaction !== 'COOL' && addedReaction !== null}
      >
        <p>😎 </p>
        <p>{typeMap.COOL ? formatNumber(typeMap.COOL, language) : ''}</p>
      </button>
      <button
        className={`outline-highlightPrimary aspect-square justify-center h-12 items-center flex flex-row text-xl   bg-backdropSecondary p-2 mx-1 rounded-2xl shadow-[#00000044] hover:opacity-50 active:hover:opacity-100 shadow-md disabled:opacity-50 ${
          addedReaction === 'HEART' ? 'bg-highlightSecondary' : 'bg-backdropSecondary'
        }`}
        onClick={() => {
          handleReaction('HEART');
          addReaction('HEART', 'post', post.postId);
        }}
        disabled={addedReaction !== 'HEART' && addedReaction !== null}
      >
        <p>😍 </p>
        <p>{typeMap.HEART ? formatNumber(typeMap.HEART, language) : ''}</p>
      </button>
      {/* <button
        className="outline-highlightPrimary aspect-[9/7] text-12 bg-backdropSecondary p-2 mx-1 rounded-2xl shadow-[#00000044] hover:opacity-50 active:hover:opacity-100 shadow-md flex items-center "
        onClick={() => {
          toggleOpen();
        }}
      >
        <MdAddComment /> gomb
      </button> */}
      <div className=" flex flex-col flex-1">
        <CommentModal preview={preview} user={user} language={language} postId={post.postId} comments={post.comments} />
      </div>
      {post.location?
      <div className={`absolute  ml-2 text-[1.05rem] text-textColor bg-backdropPrimary opacity-75 px-2 gap-1 py-2 rounded-xl flex flex-row items-center ${ post.vehicle? " -mt-28 " : " -mt-12 "}`}>
      <MdLocationPin className='text-textColor'></MdLocationPin>
      {post.location}</div>
      :("")}
    </div>
  );
}
