import Spinner from "@components/Spinner";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import ReplyItem from "@pages/board/ReplyItem";
import ReplyNew from "@pages/board/ReplyNew";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
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

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['posts', _id, 'replies'],
    queryFn: ({pageParam = 1}) => axios.get(`/posts/${_id}/replies?delay=3000`, {params: {page: pageParam, limit: import.meta.env.VITE_REPLY, sort: JSON.stringify({_id: -1})}}),
    // select: response => response.data,
    // refetchInterval: 1000,

    // 마지막 페이지와 함께 전체 페이지 목록을 받아서 queryFn에 전달할 pageParam 값을 return하도록 구현
    // false를 return하면 더 이상 queryFn이 호출되지 않고 무한 스크롤 종료
    // lastPage = response, allPages = response.data.pages
    getNextPageParam: (lastPage, allPages) => {
      console.log("lastPage", lastPage, "allPages", allPages)
      const totalPages = lastPage.data.pagination.totalPages;
      const nextPage = allPages.length < totalPages ? allPages.length + 1 : false;
      return nextPage;
    }
  });

  // ES2019 => Array.prototype.flatMap() : 2차원 배열을 1차원 배열로
  const list = data?.pages?.flatMap(page => page.data.item.map(item => <ReplyItem key={item._id} item={item} />));
  const hasNext = data?.pages.at(-1).data.pagination.page < data?.pages.at(-1).data.pagination.totalPages;

  return (
    <section className="mb-8 p-4">
      <h4 className="my-8 font-semibold">댓글 {list?.length || 0}개</h4>
      <InfiniteScroll
        pageStart={1}
        loadMore={fetchNextPage}
        hasMore={hasNext}
        loader={<Spinner key='0'/>}
      >
        {list || []}
      </InfiniteScroll>
      
      <ReplyNew />
    </section>
  )
}

export default ReplyList;