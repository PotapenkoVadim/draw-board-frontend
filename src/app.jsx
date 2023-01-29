import React from 'react';
import { useRoutes } from 'react-router-dom';
import DrawBoard from '@/components/draw-board/draw-board';
import Entry from '@/components/entry/entry';

import './styles/global.scss';

export default function App() {
  return useRoutes([
    { path: '/', element: <Entry /> },
    { path: '/:id', element: <DrawBoard /> },
  ]);
}
