import { useNavigate } from 'react-router-dom'
import '../App.css'

export function SignupSuccess() {
  const navigate = useNavigate();

  return (
    <div className="signup-success-container">
      <div className="success-content">
        <div className="success-icon">✓</div>
        <h1>회원가입 완료!</h1>
        <p>회원가입이 성공적으로 완료되었습니다.</p>
        <p>이제 로그인하여 서비스를 이용하실 수 있습니다.</p>
        <div className="success-actions">
          <button onClick={() => navigate('/')} className="home-btn">
            홈으로
          </button>
          <button onClick={() => navigate('/login')} className="login-btn">
            로그인하기
          </button>
        </div>
      </div>
    </div>
  )
}

