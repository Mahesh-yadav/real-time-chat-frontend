import ConversationPage from '../pages/ConversationPage';
import ConversationsListPage from '../pages/ConversationsListPage';
import NewConversationPage from '../pages/NewConversationPage';
import SignInPage from '../pages/SignInPage';

export const routes = [
  {
    path: '/sign-in',
    Component: SignInPage,
    exact: true,
    private: false,
  },
  {
    path: '/',
    Component: ConversationsListPage,
    exact: true,
    private: true,
  },
  {
    path: '/conversations/new',
    Component: NewConversationPage,
    exact: true,
    private: true,
  },
  {
    path: '/conversations/:conversationId',
    Component: ConversationPage,
    private: true,
    exact: true,
  },
];
