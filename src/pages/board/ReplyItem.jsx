import PropTypes from 'prop-types';

function ReplyItem({ item }) {
  return (
    <div className='shadow-md rounded-md p-4 mb-8'>
      <div className='flex gap-2 items-center mb-2 px-2 text-sm'>
        <img className='w-8 rounded-full' src={`https://market-lion.koyeb.app/api/files/${item.user.profile}`} alt="" />
        <a href="" className='font-semibold text-blue-700 dark:text-blue-300'>{item.user.name}</a>
        <time className='ml-auto text-gray-500' dateTime={item.createdAt}>{item.createdAt}</time>
      </div>
      <pre className='whitespace-pre-wrap text-sm'>{item.comment}</pre>
    </div>
  )
}

ReplyItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default ReplyItem;