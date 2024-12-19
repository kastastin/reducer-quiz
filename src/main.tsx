import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { QuizProvider } from './context/QuizProvider.tsx';
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </StrictMode>
);
