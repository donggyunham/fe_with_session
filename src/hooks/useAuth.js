import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function useAuth(){
    // AuthContext를 사용하기 위해 useContext 훅을 사용
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("AuthProvider는 반드시 AuthContext가 필요합니다. ")
    }
    return context;
}

export default useAuth;