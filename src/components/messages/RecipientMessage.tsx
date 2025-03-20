// import { div } from 'react-native';
// import p from '@/components/ui/p';
// import { MessageProps } from '../props';
// import Avatar from '@/components/ui/Avatar';
// import MessagePost from '../media/MessagePost';
// import GroupInvite from '../media/GroupInvite';

import { Avatar } from "@mui/material";

export default function RecipientMessage({ profilePic, message, isLast, isFirst }: any) {


  return (
    <div className="flex flex-row  items-end gap-2">
      <div
        className={`bg-highlight-light rounded-r-[2rem] rounded-l-md dark:bg-highlightSecondary py-3 px-4 mt-1  max-w-[58%]
          ${isFirst ? ' rounded-bl-[1.5rem] ' : ''}
          ${isLast ? ' rounded-tl-[1.5rem] ' : ''}`}
      >
        {(message.startsWith('{{') || message.startsWith('{{')) && message.endsWith('_}}') ? (
            <p className="opacity-50 text-sm">message not supported</p>
          ) : (
            <p className="text-lg leading-tight break-all">{message}</p>
          )}
      </div>
    </div>
  );
}
