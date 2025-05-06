function TodoItem({ item, onToggle }) {
  const handleToggle = () => {
    fetch(`http://localhost:3001/api/lists/${item.listId}/checked_state`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: item.id, checked_state: !item.checked }),
    })
      .then((response) => response.json())
      .then((updatedList) => {
        onToggle(updatedList);
      });
  };

  return (
    <div className="p-4 bg-white shadow rounded flex justify-between items-center">
      <span className={item.checked ? 'line-through' : ''}>{item.label}</span>
      <button
        onClick={handleToggle}
        className={`px-4 py-2 rounded ${item.checked ? 'bg-red-600' : 'bg-green-600'} text-white`}
      >
        {item.checked ? 'Uncheck' : 'Check'}
      </button>
    </div>
  );
}

export default TodoItem;