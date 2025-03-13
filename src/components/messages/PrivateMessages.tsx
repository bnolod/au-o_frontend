import { Avatar } from '@mui/material';
import { User } from '../../lib/types';
import UserMessage from './UserMessage';

export default function PrivateMessages({ userId }: { userId: number }) {
  return (
    <>
      <div className="w-full bg-backdropPrimary border-background border-b-4 flex flex-row p-4 rounded-t-2xl">
        <Avatar />
        <h2 className="text-xl self-center pl-4 font-semibold">Username here</h2>
      </div>
      <div className="mb-4 h-full flex flex-col bg-backdropSecondary rounded-b-2xl overflow-hidden justify-between">
        <div className="flex flex-col-reverse flex-grow overflow-y-scroll py-2">
          <UserMessage message={'hellóóó'} isFirst isLast></UserMessage>
        </div>
        <div className="w-full flex justify-between gap-4 border-background border-t-4 bg-backdropPrimary p-3 place-self-end text-xl">
          <input className="flex-1 p-2 bg-backdropSecondary outline-none rounded-xl px-4" placeholder='Send a message...'></input>
          <button className="bg-highlightSecondary px-4 rounded-xl">Send</button>
        </div>
      </div>
    </>
  );
}
