import PropTypes from 'prop-types';
import { Link, useSearchParams } from 'react-router-dom';

function Pagination({totalPage, current=1}) {
  const [searchParams] = useSearchParams();
  const pageList = [];

  for (let page = 1; page <= totalPage; page++) {
    searchParams.set('page', page);
    let search = searchParams.toString();
    pageList.push((
      <li key={page}>
        <Link className={current === page ? 'font-semibold text-blue-700' : ''} to={`/posts?${search}`}>{ page }</Link>
      </li>
    ));
  }

  return (
    <div>
      <ul className='flex justify-center gap-3 m-4'>
        { pageList }
      </ul>
    </div>
  )
}

Pagination.propTypes = {
  totalPage: PropTypes.number,
  current: PropTypes.number
}

export default Pagination;