// import Avatar from '@/components/ui/Avatar';
// import p from '@/components/ui/p';

// import MessagePost from '../media/MessagePost';
// import GroupInvite from '../media/GroupInvite';

export default function UserMessage({ message, isFirst, isLast, colorScheme }: any) {
  if (message.startsWith("{{POST_") && message.endsWith("_}}")) {
//     return <MessagePost avatar={null} sender colorScheme={colorScheme} postId={Number(message.split("_")[1])} />;
            return <p>ez egy poszt</p>
  }
  if (message.startsWith("{{GROUP_") && message.endsWith("_}}")) {
//     return <GroupInvite avatar={null} sender colorScheme={colorScheme} groupId={Number(message.split("_")[1])} />;
            return <p>ez egy csoport</p>
  }
  return (
    <>
      <div className="flex flex-row-reverse items-end gap-2 pr-2">
        <div
          className={`bg-backdropPrimary p-2 
            rounded-l-[2rem] rounded-r-md py-3 px-4 mt-1  max-w-[58%]
          ${isFirst ? 'rounded-br-[1.5rem] ' : ''}
          ${isLast ? 'rounded-tr-[1.5rem] ' : ''} `}
        >
          <p className="text-xl leading-tight">{message}</p>
        </div>
      </div>
    </>
  );
}
