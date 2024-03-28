
import Button from "@components/Button";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { userState } from "@recoil/user/atoms.mjs";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";


function BoardDetail() {
  const user = useRecoilValue(userState);
  const {_id} = useParams();
  const axios = useCustomAxios();
  const navigate = useNavigate();
  // const [data, setData] = useState();

  // const fetchDetail = async () => {
  //   try {
  //     const res = await axios.get(`/posts/${_id}`);
  //     setData(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // useEffect(() => {
  //   fetchDetail();
  // }, []);

  const {isLoading, data, error} = useQuery({
    queryKey: ['posts', _id],
    queryFn: () => axios.get(`/posts/${_id}`),
    select: response => response.data,
    suspense: true,
    staleTime: 1000 * 100
  })

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${_id}`);
      alert('게시글이 삭제되었습니다!');
      navigate('/posts');
    } catch(err) {
      console.error(err);
      alert('게시글 삭제에 실패했습니다!');
    }
  }

  const item = data?.item;

  return (
    <div className="container mx-auto mt-4 px-4">
      {isLoading && <p>로딩 중</p>}
      {error && <p>{error.message}</p>}
      { item && 
        <>
          <section className="mb-8 p-4">
            <div className="ml-2 font-semibold text-2xl">{item.title}</div>
            <div className="text-right text-gray-500">작성자 : {item.user.name}</div>
            <div className="my-4">
              <div>
                <pre className="w-full p-2 whitespace-pre-wrap">{item.content}</pre>
              </div>
              <hr />
            </div>
            <div className="flex justify-end mb-4">
              <Button onClick={() => navigate('/posts')}>목록</Button>
              { (item.user._id === user?._id) && <Button bgColor="red" onClick={handleDelete}>삭제</Button>}
            </div>
          </section>
          
          <Outlet />
        </>
      }
    </div>
  )
}

export default BoardDetail;