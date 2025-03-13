import { useEffect, useState } from 'react';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { getLatestMessages } from '../../lib/ApiCalls/WsApiCalls';
import LatestMessage from '../../lib/entityWs/LatestMessage';
import LatestMessageItem from './LatestMessageItem';
import { useWebSocket } from '../../contexts/WebSocketContext';
import { ChatMessage } from '../../lib/entityWs/ChatMessage';
import { NavLink } from 'react-router';

export default function MessageBoard({msgOnClick}:{msgOnClick?:boolean}) {
  const [latestMessages, setLatestMessages] = useState<LatestMessage[]>([]);
  const { user } = useAuthentication();
  const { stompClient } = useWebSocket();

  const fetchLatest = async () => {
    const res = await getLatestMessages();
    setLatestMessages(res ? res : []);
  };

  const handleIncomingMessage = (incomingMessage: LatestMessage) => {
    setLatestMessages((prevMessages) => {



      const existingIndex = prevMessages.findIndex((msg) => {
        // If user is the recipient, find by sender (incomingMessage.username)
        if (incomingMessage.message.recipient === user?.username) {
          return msg.username === incomingMessage.username;
        }
        // Otherwise, find by recipient
        return msg.username === incomingMessage.message.recipient;
      });

      if (existingIndex !== -1) {
        // Update the existing conversation
        return prevMessages.map((msg, index) =>
          index === existingIndex
            ? { ...msg, message: incomingMessage.message, active: incomingMessage.active }
            : msg
        );
      } else {
        // If the conversation does not exist, add it to the top
        return [incomingMessage, ...prevMessages];
      }
    });
  };

  useEffect(() => {
    fetchLatest();

    let sub: { unsubscribe: () => void } | null = null;
    if (user && stompClient && stompClient.connected) {
      sub = stompClient.subscribe(`/user/queue/notifications/`, (msg: { body: string }) => {
            console.log("helloo")
        const incomingMessage = JSON.parse(msg.body) as LatestMessage;
        handleIncomingMessage(incomingMessage);
      });
    }

    return () => {
      if (sub) {
        sub.unsubscribe();
      }
    };
  }, [user, stompClient]);

  return (
    <div className="w-full gap-2 flex flex-col max-h-[90vh] overflow-y-scroll p-4">
      <h1 className='text-2xl pb-4 font-semibold text-textColor/50'>Latest messages</h1>
      {latestMessages.map((item) => (
        msgOnClick?
        <NavLink className='hover:opacity-50 active:opacity-75' to={`/messages/${item.username}`}>
        <LatestMessageItem key={item.username} latestMessage={item} />
        </NavLink>
        :
        <LatestMessageItem key={item.username} latestMessage={item} />

      ))}
    </div>
  );
}
