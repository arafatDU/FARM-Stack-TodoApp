import { useState } from 'react';

function AddTodoItemForm({ listId, onAdd }) {
  const [label, setLabel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/lists/${listId}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label }),
    })
      .then((response) => response.json())
      .then((data) => {
        onAdd(data);
        setLabel('');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="New Todo Item"
        className="p-2 border rounded w-full mb-2"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Add Item
      </button>
    </form>
  );
}

export default AddTodoItemForm;