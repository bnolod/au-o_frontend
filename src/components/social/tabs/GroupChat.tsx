import { useEffect, useState } from "react";
import { useWebSocket } from "../../../contexts/WebSocketContext";
import { useAuthentication } from "../../../contexts/AuthenticationContext";
import { Group } from "../../../lib/entity/Group";
import { GroupMessage } from "../../../lib/types";

export default function GroupChatTab({group} : {group: Group}) {
    const {sendMessage, stompClient } = useWebSocket();
  const [message, setMessage] = useState<string>('');
  const {user} = useAuthentication()
  const [chatMessages, setChatMessages] = useState<GroupMessage[]>([]);

  const onSend = (message: string) => {
    if (!message || message.length < 0) return;
    sendMessage(`group/${group.id}`, message);
  };

   useEffect(() => {

     let sub: { unsubscribe: () => void } | null = null;

        if (user && stompClient && stompClient.connected && group && sub == null) {
          sub = stompClient?.subscribe((`/topic/group/${group?.id}`), (incomingMessage) => {
            const parsedMessage = JSON.parse(incomingMessage.body) as GroupMessage;
            setChatMessages(prev => 
               [...prev, parsedMessage]
            )
          });
        }
      return () => {
        sub?.unsubscribe();
    };
    }, [group?.id,stompClient]);

  return (
    <>
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto">
            {chatMessages.map((msg, i) => (
                <div key={msg.message + i} className="flex gap-2">
                <div className="flex flex-col">
                    <span className="font-bold">@{msg.user.username}</span>
                    <span>{msg.message}</span>
                </div>
                </div>
            ))}
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
                className="flex-1 p-2 primary"
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
    </>
  )
}