import { Routes, Route, useNavigate } from 'react-router-dom'
import { Signup } from './pages/Signup'

// App.css 파일을 불러온다.
import './App.css'

function Home() {
  console.log('Home component rendered'); // 디버깅용
  const navigate = useNavigate();
  return (
    <>
      <h1>Home</h1>
      <div className="home-container">
        <h2>환영합니다!</h2>
        <p>로그인하거나 회원가입하여 시작하세요.</p>
        <div className="button-group">
          <button onClick={() => navigate('/login')} className="login-btn">
            로그인
          </button>
          <button onClick={() => navigate('/signup')} className="signup-btn">
            회원가입
          </button>
        </div>
      </div>
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
