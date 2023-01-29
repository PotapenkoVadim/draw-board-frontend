import './styles/global.scss';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './app';

const root = createRoot(document.querySelector('#root'));
root.render(<Router><App /></Router>);
