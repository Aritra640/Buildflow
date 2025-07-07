import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil'; // 👈 import RecoilRoot
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot> {/* 👈 wrap with RecoilRoot */}
      <App />
    </RecoilRoot>
  </StrictMode>
);

