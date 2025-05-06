import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CreateTodoListForm from '../components/CreateTodoListForm';

function Home() {
  const [todoLists, setTodoLists] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/lists')
      .then((response) => response.json())
      .then((data) => setTodoLists(data));
  }, []);

  const handleCreateList = (newList) => {
    setTodoLists((prev) => [...prev, newList]);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Todo Lists</h1>
      <CreateTodoListForm onCreate={handleCreateList} />
      <ul className="space-y-4">
        {todoLists.map((list) => (
          <li key={list.id} className="p-4 bg-white shadow rounded">
            <Link to={`/list/${list.id}`} className="text-blue-600 hover:underline">
              {list.name} ({list.item_count} items)
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;