import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postWithCredentials } from '../api/postWithCredentials';
import { useProtectedFetch } from '../api/useProtectedFetch';
import { useUser } from '../components/auth/useUser';
import Spinner from '../components/UI/Spinner';

export default function NewConversationPage() {
  const [conversationName, setConversationName] = useState('');
  const { isLoading: isLoadingCurrentUser, user: currentUser } = useUser();
  const { isLoading: isLoadingUsers, data: users } =
    useProtectedFetch('/users');
  const [memberIds, setMemberIds] = useState([]);

  const history = useHistory();

  const onAddMember = (id) => {
    setMemberIds([...memberIds, id]);
  };

  const onCreateConversation = async () => {
    const data = await postWithCredentials('/conversations', {
      name: conversationName,
      memberIds,
    });

    if (data) {
      history.push(`/conversations/${data.conversationId}`);
    }
  };

  if (isLoadingUsers || isLoadingCurrentUser) {
    return <Spinner />;
  }

  return (
    <div className="centered-container">
      <h1>New Conversation</h1>
      <input
        type="text"
        placeholder="Enter conversation name"
        className="full-width"
        value={conversationName}
        onChange={(e) => setConversationName(e.target.value)}
      />
      <h3>Add Members</h3>
      {users.data &&
        users.data.map((user) => (
          <div className="list-item new-conversation-list-item" key={user.id}>
            <p>{user.name}</p>
            {memberIds.includes(user.id) || user.id === currentUser.uid ? (
              <button disabled>Added</button>
            ) : (
              <button onClick={() => onAddMember(user.id)}>Add</button>
            )}
          </div>
        ))}
      <button
        className="full-width space-before"
        onClick={onCreateConversation}
      >
        Create Conversation
      </button>
    </div>
  );
}
