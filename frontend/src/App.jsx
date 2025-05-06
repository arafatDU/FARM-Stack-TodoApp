import { Outlet, Link } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-bold">TodoApp</div>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/create" className="hover:underline">Create TodoList</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
          </ul>
          <Link to="/create" className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-200">Get Started</Link>
        </nav>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
