import { PostResponse, User } from '../../lib/types';
import { addReaction } from '../../lib/apiClient';
import { useState, useEffect } from 'react';
import CommentModal from '../commentboard/CommentModal';
import { formatNumber } from '../../lib/functions';

export default function PostReactionBar({preview, post, user, language }: {preview: boolean, user: User, post: PostResponse, language: 'HU' | 'EN' }) {
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
    <div key={addedReaction ? addedReaction : 'NONE' + post.postId} className="flex text-xs flex-row p-3 justify-between">
      <button
        key={addedReaction ? addedReaction : 'NONE' + post.postId}
        className={`outline-highlightPrimary h-14 text-xl  p-2 mx-1 rounded-2xl shadow-[#66666666] hover:opacity-50 active:hover:opacity-100 shadow-md disabled:opacity-50 ${
          addedReaction === 'FIRE'
            ? 'bg-highlightPrimary'
            : 'bg-backdropSecondary'
        }`}
        onClick={() => {
          handleReaction('FIRE');
          addReaction('FIRE', 'post', post.postId);
        }}
        disabled={addedReaction !== 'FIRE' && addedReaction !== null}
      >
        🔥{' '}
        {(typeMap.FIRE > 0 || post.reactedWith === 'FIRE') &&
          (typeMap.FIRE + (post.reactedWith === null && addedReaction === 'FIRE' ? 1 : 0)) ^
            (post.reactedWith === 'FIRE' && addedReaction === null ? 1 : 0)}
      </button>
      <button
        className={`outline-highlightPrimary h-14 text-xl bg-backdropSecondary p-2 mx-1 rounded-2xl shadow-[#66666666] hover:opacity-50 active:hover:opacity-100 shadow-md disabled:opacity-50 ${
          addedReaction === 'COOL'
            ? 'bg-highlightPrimary'
            : 'bg-backdropSecondary'
        }`}
        onClick={() => {
          handleReaction('COOL');
          addReaction('COOL', 'post', post.postId);
        }}
        disabled={addedReaction !== 'COOL' && addedReaction !== null}
      >
        😎{' '}
        {typeMap.COOL ? formatNumber(typeMap.COOL, language) : ""}
      </button>
      <button
        className={`outline-highlightPrimary h-14 text-xl bg-backdropSecondary p-2 mx-1 rounded-2xl shadow-[#66666666] hover:opacity-50 active:hover:opacity-100 shadow-md disabled:opacity-50 ${
          addedReaction === 'HEART'
            ? 'bg-highlightPrimary'
            : 'bg-backdropSecondary'
        }`}
        onClick={() => {
          handleReaction('HEART');
          addReaction('HEART', 'post', post.postId);
        }}
        disabled={addedReaction !== 'HEART' && addedReaction !== null}
      >
        😍{' '}
        {typeMap.HEART ? formatNumber(typeMap.HEART, language): ""}
      </button>
      {/* <button
        className="outline-highlightPrimary text-xl bg-backdropSecondary p-2 mx-1 rounded-2xl shadow-[#66666666] hover:opacity-50 active:hover:opacity-100 shadow-md flex items-center "
        onClick={() => {
          toggleOpen();
        }}
      >
        <MdAddComment /> gomb
      </button> */}
      <div className=" flex flex-col flex-grow text-right">
        <CommentModal preview={preview} user={user} language={language} postId={post.postId} comments={post.comments}/>
        <p className="text-highlightPrimary">{post.location}</p>
        
      </div>
    </div>
  );
}
