import { Avatar } from '@mui/material';
import LatestMessage from '../../lib/entityWs/LatestMessage';

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
        <h1 className="text-lg font-semibold text-textColor">{latestMessage.username}</h1>
        <p className='truncate text-textColor/80'>{latestMessage.message.message}</p>
      </div>
    </div>
  );
}0
