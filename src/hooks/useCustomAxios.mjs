import { userState } from "@recoil/user/atoms.mjs";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const REFRESH_URL = '/auth/refresh';

function useCustomAxios() {
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인 된 사용자 정보
  const user = useRecoilValue(userState);
  
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_SERVER,
    timeout: 1000 * 10,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });

  // 요청 인터셉터(성공, err)
  instance.interceptors.request.use((config) => {
    if (user) {
      let token = user.token.accessToken;
      if (config.url === REFRESH_URL) {
        token = user.token.refreshToken;
      }
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // 응답 인터셉터(성공, err)
  instance.interceptors.response.use(res => res, async err => {
    const { config, response } = err;
    if (response?.status === 401) {
      // refresh 토큰도 만료된 경우
      if (config.url === REFRESH_URL) {
        const toLogin = confirm("로그인 후 이용 가능합니다. 로그인 하시겠습니까?");
        toLogin && navigate('/users/login', {state: {from: location.pathname}});
      } else {
        // access 토큰 재발급 요청
        const accessToken = await getAccessToken(instance);
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
          return axios(config);
        }
      }
      
    } else {
      return Promise.reject(err);
    }
    
  });

  async function getAccessToken(instance) {
    try {
      const {data: {accessToken}} = await instance.get(REFRESH_URL);
      return accessToken;
    } catch(err) {
      console.error(err);
    }
  }

  return instance;
}

export default useCustomAxios;