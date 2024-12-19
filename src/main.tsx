import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/Home/App.tsx'
import SignupForm from './pages/Cadastro/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SignupForm/>
  </StrictMode>,
)
