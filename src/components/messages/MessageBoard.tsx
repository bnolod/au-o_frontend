import { useEffect, useState } from 'react';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { getLatestMessages } from '../../lib/ApiCalls/WsApiCalls';
import LatestMessage from '../../lib/entityWs/LatestMessage';
import LatestMessageItem from './LatestMessageItem';
import { useWebSocket } from '../../contexts/WebSocketContext';
import { ChatMessage } from '../../lib/entityWs/ChatMessage';

export default function MessageBoard() {
  const [latestMessages, setLatestMessages] = useState<LatestMessage[]>([]);
  const { user } = useAuthentication();
  const { stompClient } = useWebSocket();

  const fetchLatest = async () => {
    const res = await getLatestMessages();
    setLatestMessages(res ? res : []);
  };

  const handleIncomingMessage = (incomingMessage: LatestMessage) => {
    setLatestMessages((prevMessages) => {
      const existingIndex = prevMessages.findIndex(
        (msg) => msg.username === incomingMessage.username
      );

      if (existingIndex !== -1) {
        // Update existing user's latest message
        const updatedMessages = [...prevMessages];
        updatedMessages[existingIndex] = {
          ...updatedMessages[existingIndex],
          message: incomingMessage.message,
          active: incomingMessage.active, // Ensure active status is updated
        };
        return updatedMessages;
      } else {
        // Add new entry if user doesn't exist
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
        <LatestMessageItem key={item.username} latestMessage={item} />
      ))}
    </div>
  );
}
