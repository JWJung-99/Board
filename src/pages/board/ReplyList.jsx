import useCustomAxios from "@hooks/useCustomAxios.mjs";
import ReplyItem from "@pages/board/ReplyItem";
import ReplyNew from "@pages/board/ReplyNew";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";


function ReplyList() {
  const axios = useCustomAxios();
  const {_id} = useParams();
  // const [data, setData] = useState();

  // const fetchList = async () => {
  //   try {
  //     const res = await axios.get(`/posts/${_id}/replies`, {
  //       params: {sort: JSON.stringify({_id: -1})}
  //     });
  //     setData(res.data);
  //   } catch(err) {
  //     console.error(err);
  //   }
  // }

  // useEffect(() => {
  //   fetchList();
  // }, []);

  const { data } = useQuery({
    queryKey: ['posts', _id, 'replies'],
    queryFn: () => axios.get(`/posts/${_id}/replies`, {params: {sort: JSON.stringify({_id: -1})}}),
    select: response => response.data,
    // refetchInterval: 1000
  })

  const list = data?.item.map(item => <ReplyItem key={item._id} item={item} />)

  return (
    <section className="mb-8 p-4">
      <h4 className="my-8 font-semibold">댓글 {list?.length || 0}개</h4>
      {list}
      <ReplyNew />
    </section>
  )
}

export default ReplyList;