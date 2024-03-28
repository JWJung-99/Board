import Button from "@components/Button";
import Theme from "@components/Theme";
import { userState } from "@recoil/user/atoms.mjs";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";


function Header() {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  function handleLogout() {
    setUser(null);
    navigate('/')
  }

  return (
    <header className="min-w-80 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <nav className="p-5 flex flex-wrap justify-center items-center md:flex-nowrap md:justify-between">
        <div className="w-1/2 order-1 md:w-auto">
          <a href="/" className="flex items-center gap-2">
            <img className="h-6 sm:h-9" src="/vite.svg" alt="로고 이미지" />
            <span className="text-xl font-semibold">게시판</span>
          </a>
        </div>
        <div className="w-auto order-2 text-lg mt-4 md:mt-0">
          <ul className="flex items-center gap-6">
            <li><Link to="/posts">정보 공유</Link></li>
            <li><Link to="/posts">자유게시판</Link></li>
            <li><Link to="/posts">질문게시판</Link></li>
          </ul>
        </div>
        <div className="w-1/2 order-1 flex justify-end items-center md:w-auto md:order-2">
          {user ? 
            <div className="flex items-center gap-2 shrink-0">
              <img className="w-10 h-10 rounded-full" src={`https://market-lion.koyeb.app/api/files/${user.profile}`} />
              <p className="text-sm whitespace-nowrap">{user.name}님 안녕하세요!</p>
              <Button size="sm" onClick={handleLogout}>로그아웃</Button>
            </div> : 
            <div className="flex justify-end">
              <Button size="sm" onClick={() => navigate('/users/login')}>로그인</Button>
              <Button size="sm" bgColor="gray" onClick={() => navigate('/users/signup')}>회원가입</Button>
            </div>
          }
          <Theme />
        </div>
      </nav>
    </header>
  )
}

export default Header;