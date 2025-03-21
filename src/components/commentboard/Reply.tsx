import { useState } from 'react';
import { Reactions, Reply } from '../../lib/types';
import ProfileImage from '../ProfileImage';
import ReactionButton from '../reactions/ReactionButton';
import { addReaction } from '../../lib/ApiCalls/ReactionApiCalls';
import { NavLink } from 'react-router';
import { Avatar } from '@mui/material';
import { grey } from '@mui/material/colors';

export default function ReplyItem({ reply, preview }: { preview: boolean; reply: Reply }) {
  const [currentReaction, setCurrentReaction] = useState<null | 'FIRE' | 'HEART' | 'COOL'>(reply.reactedWith);
  const [reactionState, setReactions] = useState<Reactions>({
    FIRE: reply.reactionTypeMap && reply.reactionTypeMap.FIRE ? reply.reactionTypeMap.FIRE : 0,
    HEART: reply.reactionTypeMap && reply.reactionTypeMap.HEART ? reply.reactionTypeMap.HEART : 0,
    COOL: reply.reactionTypeMap && reply.reactionTypeMap.COOL ? reply.reactionTypeMap.COOL : 0,
  });

  async function handlePress(type: null | 'FIRE' | 'HEART' | 'COOL') {
    if (currentReaction === type) {
      await addReaction('reply', reply.id, type);
      if (type) {
        setReactions({
          ...reactionState,
          [type]: reactionState[type] - 1,
        });
      }
      setCurrentReaction(null);
    } else {
      await addReaction('reply', reply.id!, type);
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
    <div className="w-full">
      <div className="w-1 bg-backdropSecondary h-full rounded-b"></div>
      <div className="flex justify-start">
      <NavLink to={`/profile/${reply.user.id}`} className={' mr-3 mt-1'}>
        <Avatar sx={{ bgcolor: grey[800], width: 40, height: 40 }} src={reply.user.profileImg}>
          {reply.user.nickname.substring(0, 3).toUpperCase()}
        </Avatar>
      </NavLink>
        <div className="flex flex-col justify-center flex-grow ">
          <h1 className="font-bold">{reply.user.nickname}</h1>
          <p className="text-xs">@{reply.user.username}</p>
        </div>
        <p className="text-xs justify-self-end items-center flex text-textColor/50">{reply.time.split('T')[0]}</p>
          
      </div>
      <div className="flex flex-col">
        <p className="ml-12">{reply.text}</p>
        <div className="flex flex-row gap-2 scale-75 self-start">

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
        <div className="flex flex-row-reverse self-start gap-2 ml-3 items-center">
        </div>
      </div>
    </div>
  );
}
