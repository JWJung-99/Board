import Layout from '@components/layout/Index';
import EnvCheck from '@pages/EnvCheck';
import ErrorPage from '@pages/ErrorPage';
import BoardDetail from '@pages/board/BoardDetail';
import BoardList from '@pages/board/BoardList';
import BoardNew from '@pages/board/BoardNew';
import ReplyList from '@pages/board/ReplyList';
import Login from '@pages/user/Login';
import Signup from '@pages/user/Signup';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <BoardList />,
      },
      {
        path: 'posts',
        element: <BoardList />,
      },
      {
        path: 'posts/:_id',
        element: <BoardDetail />,
        children: [
          {
            index: true,
            element: <ReplyList />
          }
        ]
      },
      {
        path: 'posts/new',
        element: <BoardNew />,
      },
      {
        path: 'users/login',
        element: <Login />
      },
      {
        path: 'users/signup',
        element: <Signup />
      },
      {
        path: 'envcheck',
        element: <EnvCheck />
      }
    ]
  }
]);

export default router;