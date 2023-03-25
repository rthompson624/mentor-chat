import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css'
import Chat from './pages/Chat';
import Mentors from './pages/Mentors';

const router = createBrowserRouter([
  {
    path: '/',
    element: < Mentors />,
  },
  {
    path: 'chat/:mentor',
    element: <Chat />
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
