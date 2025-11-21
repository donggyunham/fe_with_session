import { Routes, Route, useNavigate } from 'react-router-dom'
import { Signup } from './pages/Signup'
import Login from './pages/Login'
import AuthProvider from './context/AuthContext.jsx'
import useAuth from './hooks/useAuth.js'

// import { AuthProvider } from './context/AuthContext.jsx'
// import { useAuth } from '../src/hooks/useAuth.js'
// App.css 파일을 불러온다.
import './App.css'

function Home() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('로그아웃 처리 중 오류:', error)
    } finally {
      navigate('/login')
    }
  }

  return (
    <>
      <h1>Home</h1>
      <div className="home-container">
        {user ? (
          <>
            <h2>{user.nickname}님 환영합니다!</h2>
            <div className="button-group">
              <button onClick={handleLogout} className="logout-btn">
                로그아웃
              </button>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
