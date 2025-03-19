import { useEffect, useRef, useState } from 'react';
import { useWebSocket } from '../../../contexts/WebSocketContext';
import { useAuthentication } from '../../../contexts/AuthenticationContext';
import { Group } from '../../../lib/entity/Group';
import { GroupMessage } from '../../../lib/types';
import { Avatar } from '@mui/material';
import { apiFetch } from '../../../lib/apiClient';
import { MdSend } from 'react-icons/md';

export default function GroupChatTab({ group }: { group: Group }) {
  const { sendMessage, stompClient } = useWebSocket();
  const [message, setMessage] = useState<string>('');
  const { user } = useAuthentication();
  const [chatMessages, setChatMessages] = useState<GroupMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const onSend = () => {
    if (!message || message.length < 0) return;
    sendMessage(`group/${group.id}`, {
      message: message,
      groupId: group.id
    });
  };

  const handleFetch = async() => {
    const res = await apiFetch<GroupMessage[]>(`/groups/group/${group.id}/messages`)
    if (res) {
      setChatMessages(res.data? res.data.reverse() : []);
    }
    console.log("üzenetek fetchelve")
    console.log(res)
  }

  useEffect(()=>{
    if (group) {
      handleFetch();
    }
  },[group])

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
              <Avatar sx={{height:32,width:32}} src={msg.user.profileImg}></Avatar>
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
              onSend();
              setMessage('');
            }
          }}
          placeholder="Type a message..."
          className="flex-1 p-2 primary rounded-xl"
        />
        <button
          onClick={() => {
            onSend();
            setMessage('');
          }}
          className="btn-primary p-2 bg-highlightSecondary rounded-xl"
        >
          <MdSend size={24}/>
        </button>
      </div>
    </div>
  );
}
