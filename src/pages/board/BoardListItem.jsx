import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function BoardListItem({ item }) {
  const navigate = useNavigate();
  return (
    <tr className="border-b border-solid border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-900 ease-in-out">
      <td className="p-2 text-center whitespace-nowrap">{item._id}</td>
      <td className="p-2 truncate indent-4 cursor-pointer" onClick={() => {navigate(`/posts/${item._id}`)}}>{item.title}</td>
      <td className="p-2 truncate indent-2">{item.user.name}</td>
      <td className="p-2 text-center hidden sm:table-cell">{item.views || 0}</td>
      <td className="p-2 text-center hidden sm:table-cell">{item.repliesCount || 0}</td>
      <td className="p-2 text-center whitespace-nowrap truncate hidden sm:table-cell">{item.updatedAt}</td>
    </tr>
  )
}

BoardListItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default BoardListItem;