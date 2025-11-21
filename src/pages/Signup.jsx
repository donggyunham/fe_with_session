import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../hooks/useAuth.js'
import '../App.css'

export function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nick_name: ''
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
    
    // 패스워드 확인 검증
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('패스워드가 일치하지 않습니다.');
      return;
    }

    try {
      // API 호출
      const response = await axios.post('/api/user/signup', {
        email: formData.email,
        password: formData.password,
        nick_name: formData.nick_name
      });

      console.log('회원가입 성공:', response.data);
      const responseUser = response.data?.data;
      const normalizedUser = responseUser
        ? {
            ...responseUser,
            nickname: responseUser.nickname ?? responseUser.nick_name ?? ''
          }
        : {
            email: formData.email,
            nickname: formData.nick_name,
            id: null
          };
      login(normalizedUser);
      navigate('/home');
    } catch (error) {
      console.error('회원가입 실패:', error);
      if (error.response) {
        // 서버에서 응답이 온 경우
        const errorMsg = error.response.data?.message || error.response.statusText || '회원가입에 실패했습니다.';
        setErrorMessage(`회원가입 실패: ${errorMsg}`);
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
    <div className="signup-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit} className="signup-form">
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
        <div className="form-group">
          <label htmlFor="confirmPassword">패스워드 확인</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="패스워드를 다시 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="nick_name">사용자 이름</label>
          <input
            type="text"
            id="nick_name"
            name="nick_name"
            value={formData.nick_name}
            onChange={handleChange}
            required
            placeholder="사용자 이름을 입력하세요"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            회원가입
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

