// react 패키지로부터 StrictMode를 불러온다.
import { StrictMode } from 'react'
// react-dom 패키지로부터 createRoot를 불러온다.
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// index.css 파일을 불러온다.
import './index.css'
// App.jsx 파일을 불러온다. App 컴포넌트를 불러온다.
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
