import { useEffect, useState } from "react";
import { useWebSocket } from "../../../contexts/WebSocketContext";
import { useAuthentication } from "../../../contexts/AuthenticationContext";
import { Group } from "../../../lib/entity/Group";

export default function GroupChatTab({group} : {group: Group}) {
    const { messages, sendMessage, subscribeToTopic, stompClient } = useWebSocket();
  const [message, setMessage] = useState<string>('');
  const {user} = useAuthentication()
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  // Subscribe to the group topic when the component mounts
  const onSend = (message: string) => {
    if (!message || message.length < 0) return;
    sendMessage(`group/${group.id}`, message);
  };
  // Update chat messages when messages change for this group
  useEffect(() => {
    console.log('Messages:', messages);
    const groupMessages = messages[`group/${group.id}`] || [];
    setChatMessages(groupMessages.toReversed()); //van ilyen funkció nem ez a baj trust

  }, [messages, group.id, stompClient?.connected]);
   useEffect(() => {
      subscribeToTopic(`group/${group?.id}`);
  
      return () => {
        stompClient?.unsubscribe(`group/${group?.id}`);
    };
    }, [group?.id]);

  return (
    <>
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto">
            {chatMessages.map((msg, i) => (
                <div key={i} className="flex gap-2">
                <div className="flex flex-col">
                    <span className="font-bold">{}</span>
                    <span>{msg}</span>
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