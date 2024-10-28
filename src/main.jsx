//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter } from 'react-router-dom'
import { ProdStoreCtxProvider } from './ctx/ProdStoreCtx.jsx'
import {AuthProvider } from './ctx/AuthCtx.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
    <ProdStoreCtxProvider>
      <App />
    </ProdStoreCtxProvider>
    </AuthProvider>
  </BrowserRouter>
)
