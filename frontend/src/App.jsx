import { Outlet } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center text-xl font-bold">
        Todo App
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
