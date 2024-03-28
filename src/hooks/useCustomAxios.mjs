import { userState } from "@recoil/user/atoms.mjs";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const API_SERVER = "https://market-lion.koyeb.app/api";

function useCustomAxios() {
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인 된 사용자 정보
  const user = useRecoilValue(userState);
  
  const instance = axios.create({
    baseURL: API_SERVER,
    timeout: 1000 * 10,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });

  // 요청 인터셉터(성공, err)
  instance.interceptors.request.use((config) => {
    if (user) {
      const accessToken = user.token.accessToken;
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  // 응답 인터셉터(성공, err)
  instance.interceptors.response.use(res => res, err => {
    if (err.response?.status === 401) {
      const toLogin = confirm("로그인 후 이용 가능합니다. 로그인 하시겠습니까?");
      toLogin && navigate('/users/login', {state: {from: location.pathname}});
    } else {
      return Promise.reject(err);
    }
    
  });

  return instance;
}

export default useCustomAxios;