import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SortingAlgorithmProvider } from './context/Visualizer.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SortingAlgorithmProvider>
      <App />
    </SortingAlgorithmProvider>
  </React.StrictMode>,
)
