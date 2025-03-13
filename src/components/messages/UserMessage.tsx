// import Avatar from '@/components/ui/Avatar';
// import p from '@/components/ui/p';

// import MessagePost from '../media/MessagePost';
// import GroupInvite from '../media/GroupInvite';

export default function UserMessage({
  message,
  isFirst,
  isLast,
}: {
  message: string;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <>
      <div className="flex flex-row-reverse items-end gap-2">
        <div
          className={`bg-backdropPrimary p-2 
            rounded-l-[2rem] rounded-r-md py-3 px-4 mt-1  max-w-[58%]
          ${isFirst ? 'rounded-br-[1.5rem] ' : ''}
          ${isLast ? 'rounded-tr-[1.5rem] ' : ''} `}
        >
          {(message.startsWith('{{GROUP_') || message.startsWith('{{POST_')) && message.endsWith('_}}') ? (
            <p className="opacity-50 text-sm">message not supported</p>
          ) : (
            <p className="text-lg leading-tight break-all">{message}</p>
          )}
        </div>
      </div>
    </>
  );
}
