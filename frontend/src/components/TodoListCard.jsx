import { Link } from 'react-router-dom';

function TodoListCard({ id, name, itemCount }) {
  return (
    <div className="p-4 bg-white shadow rounded hover:shadow-lg transition duration-200 min-h-[160px]">
      <Link to={`/list/${id}`} className="text-blue-600 hover:underline">
        {name} ({itemCount} items)
      </Link>
    </div>
  );
}

export default TodoListCard;