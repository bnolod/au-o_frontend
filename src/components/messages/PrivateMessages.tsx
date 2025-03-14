import { Avatar } from '@mui/material';
import UserMessage from './UserMessage';
import RecipientMessage from './RecipientMessage';
import { useState, useRef, useEffect } from 'react';
import { useWebSocket } from '../../contexts/WebSocketContext';
import { apiFetch } from '../../lib/apiClient';
import { ChatMessage } from '../../lib/entityWs/ChatMessage';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { User } from '../../lib/types';
import { NavLink } from 'react-router';
import { MdSend } from 'react-icons/md';

export default function PrivateMessages({ userId }: { userId: number }) {
  const [targetUser, setTargetUser] = useState<User | null>(null);
  const { stompClient } = useWebSocket();
  const { user } = useAuthentication();
  const lastmessageref = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');

  const fetchMessages = async () => {
    const response = await apiFetch(`messages/user/${targetUser!.username}`, 'GET', true);
    if (response) {
      console.log('response: ', response);
      const data = response.data as ChatMessage[];
      setMessages(data);
    }
  };

  const fetchUser = async () => {
    const res = await apiFetch<User | null>(`users/user/${userId}`, 'GET', true);
    if (res && res.data) {
      setTargetUser(res.data);
    } else setTargetUser(null);
  };

  useEffect(() => {
    if (targetUser?.id != userId) {
      fetchUser();
    }
    if (targetUser != null && targetUser.id == userId) {
      fetchMessages();
    }
    fetchMessages();
  }, [user, userId,targetUser]);

  useEffect(() => {
    if (lastmessageref.current) {
      lastmessageref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    let sub: { unsubscribe: () => void } | null = null;
    if (user && stompClient && stompClient.connected && targetUser) {
      sub = stompClient.subscribe(`/user/queue/chat/${targetUser.username}`, (msg: { body: string }) => {
        const incomingMessage = JSON.parse(msg.body) as ChatMessage;
        // Filter messages to include only those exchanged with username
        setMessages((prev) => [incomingMessage, ...prev]);
        console.log('message received: ', incomingMessage);
        console.log('messages: ', messages);
        console.log('latest message in list:');
      });
    }
    return () => {
      if (sub) {
        sub.unsubscribe();
      }
    };
  }, [user, stompClient, targetUser]);

  const sendMessage = () => {
    console.log('message sending');
    console.log(message);
    if (stompClient && message.trim() !== '' && user && targetUser) {
      const targetedMessage = { username: targetUser.username, message: message };
      stompClient.publish({
        destination: '/app/chat/user/',
        body: JSON.stringify(targetedMessage),
      });
      setMessage('');
    }
  };

  return (
    <>
      <NavLink to={`/profile/${userId}`} className="w-full bg-backdropPrimary border-background border-b-4 flex flex-row p-4 rounded-t-2xl hover:opacity-50">
        <Avatar src={targetUser?.profileImg} sx={{height:48,width:48}} />
        <h2 className="text-xl self-center pl-4 font-semibold">{targetUser?.nickname}</h2>
      </NavLink>
      <div className="mb-4 h-full flex flex-col bg-backdropSecondary rounded-b-2xl overflow-hidden justify-between">
        <div className="flex flex-col-reverse flex-grow overflow-y-scroll py-2 px-4">
          <div className="h-1px" ref={lastmessageref}></div>
          {user && targetUser && messages
            ? messages.map((item, index) =>
                item.user.username === user.username ? (
                  <UserMessage
                    key={item.id}
                    message={item.message}
                    isLast={
                      !messages[index + 1] ||
                      (messages[index + 1] && messages[index + 1].user.username !== user.username)
                    }
                    isFirst={!messages[index - 1] || messages[index - 1].user.username !== user.username}
                  />
                ) : (
                  <RecipientMessage
                    key={item.id}
                    message={item.message}
                    isLast={
                      !messages[index + 1] ||
                      (messages[index + 1] && messages[index + 1].user.username !== targetUser.username)
                    }
                    isFirst={!messages[index - 1] || messages[index - 1].user.username !== targetUser.username}
                  />
                )
              )
            : ''}
        </div>
        <div className="w-full flex justify-between gap-4 border-background border-t-4 bg-backdropPrimary p-3 place-self-end text-xl">
          <input
            className="flex-1 p-2 bg-backdropSecondary outline-none rounded-xl px-4"
            maxLength={255}
            placeholder="Send a message..."
            value={message}
            onChange={(e) => {
              setMessage(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          ></input>
          <button className="bg-highlightSecondary px-4 rounded-xl hover:opacity-50 transition-opacity" onClick={sendMessage}>
            <MdSend></MdSend>
          </button>
        </div>
      </div>
    </>
  );
}
