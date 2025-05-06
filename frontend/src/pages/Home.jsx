import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateTodoListForm from '../components/CreateTodoListForm';
import TodoListCard from '../components/TodoListCard';

function Home() {
  const [todoLists, setTodoLists] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/lists')
      .then((response) => response.json())
      .then((data) => setTodoLists(data))
      .catch((error) => console.error('Error fetching todo lists:', error));
  }, []);

  const handleCreateList = (newList) => {
    setTodoLists((prev) => [...prev, newList]);
    setShowCreateForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <nav className="flex justify-between items-center bg-blue-600 p-4 text-white">
        <h1 className="text-2xl font-bold">TodoApp</h1>
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded w-1/2"
        />
      </nav>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-4 rounded cursor-pointer hover:bg-gray-100 h-40"
          onClick={() => setShowCreateForm(true)}
        >
          <div className="text-6xl text-blue-600">+</div>
          <p className="text-lg font-semibold mt-2">Create a new Todo List</p>
        </div>
        {todoLists.map((list) => (
          <TodoListCard key={list.id} id={list.id} name={list.name} itemCount={list.item_count} />
        ))}
      </div>
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <CreateTodoListForm onCreate={handleCreateList} />
            <button
              onClick={() => setShowCreateForm(false)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;