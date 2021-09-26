import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io as socketIOClient } from 'socket.io-client';
import { useUser } from '../components/auth/useUser';

export default function ConversationPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const socketRef = useRef(null);

  const { conversationId } = useParams();
  const { user } = useUser();

  useEffect(() => {
    const establishSocketConnection = async () => {
      const socket = socketIOClient('http://localhost:4000', {
        query: { conversationId, token: await user.getIdToken() },
      });

      socketRef.current = socket;

      socket.on('conversation', (conversation) => {
        setMessages(conversation.messages);
      });

      socket.on('messageUpdated', (messages) => {
        setMessages(messages);
      });
    };

    if (user) {
      establishSocketConnection();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [conversationId, user]);

  const postMessage = async () => {
    socketRef.current.emit('postMessage', {
      text: message,
      conversationId,
      query: { conversationId, token: await user.getIdToken() },
    });

    setMessage('');
  };

  return (
    <div className="centered-container">
      {messages.map((message) => (
        <div className="list-item" key={message._id}>
          <h3>{message.postedBy.name}</h3>
          <p>{message.text}</p>
        </div>
      ))}
      <div className="input-form">
        <input
          type="text"
          placeholder="Enter new message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={postMessage}>Send Message</button>
      </div>
    </div>
  );
}
