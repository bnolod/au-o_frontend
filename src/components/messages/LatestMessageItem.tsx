import { Avatar } from '@mui/material';
import LatestMessage from '../../lib/entityWs/LatestMessage';

function startsWith(str: string, prefix: string) {
  return str.slice(0, prefix.length) === prefix;
}

function endsWith(str: string, suffix: string) {
  return str.slice(-suffix.length) === suffix;
}

function isUnsupportedMessage(message: string) {
  return (startsWith(message, '{{') || startsWith(message, '{{')) && endsWith(message, '_}}');
}

export default function LatestMessageItem({ latestMessage }: { latestMessage: LatestMessage }) {
  return (
    <div className="w-full flex flex-row">
      <Avatar src={latestMessage.profileImg} className="self-center" sx={{ height: 48, width: 48 }} />
      {latestMessage.active ? (
        <div className="rounded-full bg-green-500 mt-[34px] ml-[34px] h-4 w-4 absolute border-background border-2"></div>
      ) : (
        ''
      )}
      <div className="pl-4 flex flex-col overflow-x-hidden">
        <h1 className="text-lg font-semibold text-textColor">{latestMessage.nickname}</h1>
        {isUnsupportedMessage(latestMessage.message.message) ? (
          <p className="text-textColor/50">{latestMessage.message.user.username}: message not supported</p>
        ) : (
          <p className="truncate text-textColor/80">{latestMessage.message.user.username}: {latestMessage.message.message}</p>
        )}
      </div>
    </div>
  );
}
