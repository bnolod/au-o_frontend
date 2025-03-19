import { useEffect, useState } from 'react';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { getLatestMessages } from '../../lib/ApiCalls/WsApiCalls';
import LatestMessage from '../../lib/entityWs/LatestMessage';
import LatestMessageItem from './LatestMessageItem';
import { useWebSocket } from '../../contexts/WebSocketContext';
import { ChatMessage } from '../../lib/entityWs/ChatMessage';
import { NavLink } from 'react-router';

export default function MessageBoard({ msgOnClick }: { msgOnClick?: boolean }) {
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
        // Check if the incoming message is from or to the authenticated user
        return (
          (msg.username === incomingMessage.username && incomingMessage.message.recipient.username === user?.username) ||
          (msg.username === incomingMessage.message.recipient.username && incomingMessage.username === user?.username)
        );
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
        const formattedMessage = incomingMessage;
        if(formattedMessage.message.user.username === user?.username) {
          formattedMessage.username = formattedMessage.message.recipient.username;
          formattedMessage.nickname = formattedMessage.message.recipient.nickname
          formattedMessage.id = formattedMessage.message.recipient.id;
        }
        return [formattedMessage, ...prevMessages];
      }
    });
  };

  useEffect(() => {
    fetchLatest();

    let sub: { unsubscribe: () => void } | null = null;
    if (user && stompClient && stompClient.connected) {
      sub = stompClient.subscribe(`/user/queue/notifications/`, (msg: { body: string }) => {
        console.log("helloo");
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

    <div className="w-full gap-2 flex flex-col h-full mb-4 overflow-y-scroll p-4">
      <h1 className='text-2xl pb-4 font-semibold text-textColor/50'>Latest messages</h1>
      {latestMessages.map((item) => (
        msgOnClick ?
          <NavLink className='hover:opacity-50 active:opacity-75' to={`/messages/${item.id}`} key={item.username}>
            <LatestMessageItem latestMessage={item} />
          </NavLink>
          :
          <LatestMessageItem key={item.username} latestMessage={item} />
      ))}
    </div>

  );
}
