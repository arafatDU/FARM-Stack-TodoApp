import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddTodoItemForm from '../components/AddTodoItemForm';
import TodoItem from '../components/TodoItem';

function TodoList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/lists/${id}`)
      .then((response) => response.json())
      .then((data) => setTodoList(data));
  }, [id]);

  // Fixed strike-through and deletion logic
  const handleToggleItem = (item) => {
    fetch(`http://localhost:3001/api/lists/${id}/checked_state`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: item.id, checked_state: !item.checked }),
    })
      .then((response) => response.json())
      .then((updatedList) => setTodoList(updatedList))
      .catch((error) => console.error('Error updating item:', error));
  };

  const handleAddItem = (newItem) => {
    setTodoList((prev) => ({
      ...prev,
      items: [...prev.items, { ...newItem, label: newItem.label || '', checked: false }],
    }));
  };

  const handleBack = () => navigate('/');

  if (!todoList) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <button onClick={handleBack} className="mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
        Back
      </button>
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">{todoList.name}</h1>
      <AddTodoItemForm listId={id} onAdd={handleAddItem} />
      <ul className="space-y-4">
        {todoList.items.map((item) => (
          <li key={item.id} className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleToggleItem(item)}
              className="w-5 h-5"
            />
            <span className={item.checked ? 'line-through text-gray-500' : ''}>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;