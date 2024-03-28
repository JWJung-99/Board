
import Button from "@components/Button";
import Pagination from "@components/Pagination";
import Search from "@components/Search";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import BoardListItem from "@pages/board/BoardListItem";
import { userState } from "@recoil/user/atoms.mjs";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

function BoardList() {
  // const [data, setData] = useState();
  // const fetchBoardList = async () => {
  //   try {
  //     const response = await axios.get('/posts');
  //     console.log(response.data);
  //     setData(response.data);
  //   } catch(err) {
  //     console.error(err);
  //   }
  // }

  // useEffect(() => {
  //   fetchBoardList();
  // }, []);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const axios = useCustomAxios();
  const [searchParams, setSearchParams] = useSearchParams();

  const {isLoading, data, error, refetch} = useQuery({
    queryKey: ['posts'],
    queryFn: () => axios.get('/posts', { params: {page: searchParams.get('page'), limit: 10, keyword: searchParams.get('keyword')} }), // Promise를 반환
    select: response => response.data,
    // staleTime: 1000 * 10,
    suspense: true
  });

  useEffect(() => {
    refetch();
  }, [searchParams.toString()]);

  function handleSearch(keyword) {
    console.log(keyword);
    searchParams.set('keyword', keyword);
    searchParams.set('page', 1);
    setSearchParams(searchParams);
  }

  function handleNewPost() {
    //  to="/posts/new"
    if (!user) {
      const toLogin = confirm("로그인 후 이용 가능합니다. 로그인 하시겠습니까?");
      toLogin && navigate('/users/login');
    } else {
      navigate('/posts/new');
    }
  }

  const itemList = data?.item?.map((item) => <BoardListItem key={item._id} item={item} />)

  return (
    <div className="min-w-80 p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">게시물 목록 조회</h2>
      </div>
      <div className="flex justify-end mr-4">
        <Search onClick={handleSearch} />
        <Button onClick={handleNewPost}>글쓰기</Button>
      </div>
      <section className="p-4">
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[40%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-500">
              <th className="p-2 whitespace-nowrap">번호</th>
              <th className="p-2 whitespace-nowrap">제목</th>
              <th className="p-2 whitespace-nowrap">글쓴이</th>
              <th className="p-2 whitespace-nowrap hidden sm:table-cell">조회</th>
              <th className="p-2 whitespace-nowrap hidden sm:table-cell">작성일</th>
            </tr>
          </thead>
          <tbody>
            { isLoading && <tr><td>로딩 중...</td></tr> }
            { error && <tr><td>{error.message}</td></tr> }
            {itemList}
          </tbody>
        </table>
        <Pagination totalPage={data?.pagination.totalPages} current={data?.pagination.page} />
        <hr />
        
      </section>
    </div>

  )
}

export default BoardList;