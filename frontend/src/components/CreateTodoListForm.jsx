import { useState } from 'react';

function CreateTodoListForm({ onCreate }) {
  const [name, setName] = useState('');
  const [items, setItems] = useState(['']);

  const handleAddItem = () => {
    setItems((prev) => [...prev, '']);
  };

  const handleItemChange = (index, value) => {
    setItems((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const handleDeleteItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Todo list name cannot be empty');

    fetch('http://localhost:3001/api/lists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, items: items.filter((item) => item.trim()) }),
    })
      .then((response) => response.json())
      .then((data) => {
        onCreate(data);
        setName('');
        setItems(['']);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Todo List Name"
        className="p-2 border rounded w-full"
      />
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            value={item}
            onChange={(e) => handleItemChange(index, e.target.value)}
            placeholder="Todo Item"
            className="p-2 border rounded flex-1"
          />
          <button
            type="button"
            onClick={() => handleDeleteItem(index)}
            className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddItem}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Item
      </button>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
      >
        Create Todo
      </button>
    </form>
  );
}

export default CreateTodoListForm;