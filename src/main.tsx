import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


import { startAppVersionPolling } from "./service/startAppVersionPolling.ts";

startAppVersionPolling(120_000);
createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <App />
  </StrictMode>,
)