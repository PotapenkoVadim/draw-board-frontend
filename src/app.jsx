import React from 'react';
import Canvas from '@/components/canvas/canvas';
import Toolbar from '@/components/toolbar/toolbar';
import SettingBar from '@/components/setting-bar/setting-bar';

import './styles/global.scss';

export default function App() {
  return (
    <main className="app">
      <Toolbar />

      <SettingBar />

      <Canvas />
    </main>
  );
}
