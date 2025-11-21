import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
// AuthProvider의 상태와 함수들을 접근하는 hook(함수)
import useAuth from "../hooks/useAuth.js"

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    // login은 함수이고, AuthProvider에서 정의한다.
    const { login } = useAuth();
    const navigate = useNavigate();
    // const handleEmailChange = (e) => {
    //     setEmail(e.target.value);
    //     console.log(email);
    // }
    // 위의 const handelEmailChange 와 동일한 함수이다.
    function handleEmailChange(e) {
        setEmail(e.target.value);
        console.log(email);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log('로그인 버튼 클릭됨.');
        const data = {email, password};  // object 형태로 data를 구성함.

        if (password === "") {
            alert("비밀번호를 입력하세요.");
            return;
        }

        try {
            const response = await axios({
                method: "post",
                url: "/api/user/login",
                data,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            console.log(response.data);
            if (response.data.status === "success") {
                // 로그인 처리 후 홈으로 이동
                console.log(response.data.data);
                login(response.data.data);
                setErrMsg("");
                navigate('/home');
            }
        } catch ( error ) {
            // 에러처리
            // console.log(error.message);
            setErrMsg(error.response.data.message || "로그인 실패했습니다. 다시 시도 해주세요.");
        }
    }

    return (
        <>
            <div className="login-container">
                <h1>Login</h1>
                <p>이메일과 패스워드를 입력하세요.</p>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        {/* 이메일 입력란 */}
                        <input 
                            type="email"
                            placeholder="이메일"
                            value={ email }
                            onChange={handleEmailChange}
                            className="border p-2 rounded"
                            required
                        />
                        {/* 비밀번호 입력란 */}
                        <input 
                            type="password"
                            placeholder="비밀번호"
                            value={ password }
                            onChange={(e)=> setPassword(e.target.value)}
                            className="border p-2 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-blue-500 hover:bg-blue-600"
                    >
                        로그인
                    </button>
                    <button
                        type="button"
                        className="mt-4 ml-2 bg-gray-500 hover:bg-gray-600"
                        onClick={() => navigate('/signup')}
                    >
                        회원가입
                    </button>
                </form>

                {/* 에러 메시지 */}
                {errMsg && (
                    <p className="text-red-500">{ errMsg }</p>
                )}

            </div>
        </>
    );
}

export default Login;