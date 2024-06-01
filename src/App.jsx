import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login.jsx';

const router = createBrowserRouter([
  {
    path: '/workbench',
    element: <Login />,
  },
]);

function Router() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default Router;
