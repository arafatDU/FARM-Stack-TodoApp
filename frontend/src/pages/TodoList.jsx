import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddTodoItemForm from '../components/AddTodoItemForm';
import TodoItem from '../components/TodoItem';

function TodoList() {
  const { id } = useParams();
  const [todoList, setTodoList] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/lists/${id}`)
      .then((response) => response.json())
      .then((data) => setTodoList(data));
  }, [id]);

  const handleToggleItem = (updatedList) => {
    setTodoList(updatedList);
  };

  if (!todoList) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{todoList.name}</h1>
      <AddTodoItemForm listId={id} onAdd={(newItem) => setTodoList((prev) => ({
        ...prev,
        items: [...prev.items, newItem],
      }))} />
      <ul className="space-y-4">
        {todoList.items.map((item) => (
          <li key={item.id}>
            <TodoItem item={{ ...item, listId: id }} onToggle={handleToggleItem} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;