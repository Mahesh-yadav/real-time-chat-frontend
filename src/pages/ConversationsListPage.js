import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../components/auth/useUser';
import { useProtectedFetch } from '../api/useProtectedFetch';
import Spinner from '../components/UI/Spinner';

export default function ConversationsListPage() {
  const { user } = useUser();
  const { isLoading, data: conversations } = useProtectedFetch(
    `/users/${user.uid}/conversations`
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="centered-container" style={{ marginBottom: '50px' }}>
      <h1 className="section-heading">Conversations</h1>
      {conversations.data &&
        conversations.data.map((conversation) => (
          <Link
            to={`/conversations/${conversation._id}`}
            key={conversation._id}
          >
            <div className="list-item">
              <h3>{conversation.name}</h3>
              <p>{conversation.memberIds.length} members</p>
            </div>
          </Link>
        ))}

      <Link to="/conversations/new">
        <button className="full-width space-before">New Conversation</button>
      </Link>
    </div>
  );
}
