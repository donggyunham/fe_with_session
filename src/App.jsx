import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Signup } from './pages/Signup'
import { SignupSuccess } from './pages/SignupSuccess'
import { Login } from './pages/Login'

// App.css 파일을 불러온다.
import './App.css'

function Home() {
  console.log('Home component rendered'); // 디버깅용
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      // 먼저 localStorage에서 사용자 정보 확인
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('사용자 정보 파싱 오류:', error);
        }
      }

      // 세션 정보 확인 (새로고침 시 세션 복구)
      try {
        const response = await axios.get('/api/user/session');
        if (response.data.status === 'success' && response.data.data) {
          // 세션 정보가 있으면 사용자 정보 복구
          const sessionUser = response.data.data;
          setUser(sessionUser);
          // localStorage에도 저장
          localStorage.setItem('user', JSON.stringify(sessionUser));
        }
      } catch (error) {
        // 세션이 없거나 오류가 발생한 경우
        console.log('세션 정보 없음 또는 오류:', error);
        // 세션이 없으면 localStorage도 정리
        if (error.response?.status === 401 || error.response?.status === 404) {
          localStorage.removeItem('user');
          setUser(null);
        }
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      // 로그아웃 API 호출하여 서버 세션 삭제
      await axios.post('/api/user/logout');
      console.log('로그아웃 성공');
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
      // API 호출이 실패해도 클라이언트 측에서는 로그아웃 처리
    } finally {
      // localStorage에서 사용자 정보 제거
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  return (
    <>
      <h1>Home</h1>
      <div className="home-container">
        {user ? (
          <>
            <h2>{user.nickname}님 로그인 성공하셨습니다!</h2>
            <p>환영합니다, {user.nickname}님!</p>
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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup/success" element={<SignupSuccess />} />
    </Routes>
  )
}

export default App
