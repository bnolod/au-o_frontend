import { useEffect, useRef, useState } from 'react';
import { useWebSocket } from '../../../contexts/WebSocketContext';
import { useAuthentication } from '../../../contexts/AuthenticationContext';
import { Group } from '../../../lib/entity/Group';
import { GroupMessage } from '../../../lib/types';
import { Avatar } from '@mui/material';

export default function GroupChatTab({ group }: { group: Group }) {
  const { sendMessage, stompClient } = useWebSocket();
  const [message, setMessage] = useState<string>('');
  const { user } = useAuthentication();
  const [chatMessages, setChatMessages] = useState<GroupMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const onSend = (message: string) => {
    if (!message || message.length < 0) return;
    sendMessage(`group/${group.id}`, message);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    let sub: { unsubscribe: () => void } | null = null;

    if (user && stompClient && stompClient.connected && group && sub == null) {
      sub = stompClient?.subscribe(`/topic/group/${group?.id}`, (incomingMessage) => {
        const parsedMessage = JSON.parse(incomingMessage.body) as GroupMessage;
        setChatMessages((prev) => [...prev, parsedMessage]);
      });
    }
    return () => {
      sub?.unsubscribe();
    };
  }, [group?.id, stompClient]);

  return (
    <div className="bg-background rounded-2xl p-2 flex flex-col h-96  overflow-hidden">
      <div className="flex-1 overflow-y-scroll">
        {chatMessages.map((msg, i) => (
          <div key={msg.message + i}>
            <div className="flex flex-row my-2 items-center gap-2">
              <Avatar sx={{height:32,width:32}} src={user?.profileImg}></Avatar>
              <span className="font-bold text-textColor/75">@{msg.user.username}:</span>
              <span>{msg.message}</span>
            </div>
          </div>
        ))}
        <div ref={scrollRef} className='h-1'></div>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onSend(message);
              setMessage('');
            }
          }}
          placeholder="Type a message..."
          className="flex-1 p-2 primary rounded-xl"
        />
        <button
          onClick={() => {
            onSend(message);
            setMessage('');
          }}
          className="btn-primary"
        >
          Send
        </button>
      </div>
    </div>
  );
}
