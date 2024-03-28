import Footer from "@components/layout/Footer";
import Header from "@components/layout/Header";
import { useRouteError } from "react-router-dom";


function ErrorPage() {
  const err = useRouteError();
  const message = err.status === 404 ? '존재하지 않는 페이지입니다.' : '예상하지 못한 에러가 발생했습니다.';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="p-10">
        <h2 className="text-3xl font-bold mb-10 text-red-500">에러 메세지</h2>
        <p className="text-xl font-semibold">{ message }</p>
      </div>
      <Footer />
    </div>
  )
}

export default ErrorPage;