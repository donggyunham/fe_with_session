import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // 에러 메시지 초기화

    try {
      // API 호출
      const response = await axios.post('/api/user/login', {
        email: formData.email,
        password: formData.password
      });

      console.log('로그인 성공:', response.data);
      
      // 로그인 성공 시 사용자 정보를 localStorage에 저장
      if (response.data.status === 'success' && response.data.data) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      
      // 로그인 성공 시 홈으로 이동
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error);
      if (error.response) {
        // 서버에서 응답이 온 경우
        const errorMsg = error.response.data?.message || error.response.statusText || '로그인에 실패했습니다.';
        setErrorMessage(`로그인 실패: ${errorMsg}`);
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        setErrorMessage('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
      } else {
        // 요청 설정 중 오류가 발생한 경우
        setErrorMessage(`오류가 발생했습니다: ${error.message}`);
      }
    }
  };

  return (
    <div className="login-container">
      <h1>로그인</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">패스워드</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="패스워드를 입력하세요"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            로그인
          </button>
          <button type="button" onClick={() => navigate('/')} className="cancel-btn">
            취소
          </button>
        </div>
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  )
}

