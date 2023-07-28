import { createBrowserRouter } from 'react-router-dom';
import { Checkout } from '../pages/Checkout';
import { Home } from '../pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [{}],
  },
  { path: '/checkout', element: <Checkout />, children: [{}] },
]);
