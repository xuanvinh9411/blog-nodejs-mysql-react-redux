import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Home, Users, Package, Settings, Bell } from 'lucide-react';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h1 className={`font-bold ${sidebarOpen ? 'block' : 'hidden'}`}>Admin Dashboard</h1>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded hover:bg-gray-800"
          >
            <Menu size={20} />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/" className="flex items-center p-2 rounded hover:bg-gray-800">
                <Home size={20} />
                <span className={`ml-3 ${sidebarOpen ? 'block' : 'hidden'}`}>Trang chủ</span>
              </Link>
            </li>
            <li>
              <Link to="/users" className="flex items-center p-2 rounded hover:bg-gray-800">
                <Users size={20} />
                <span className={`ml-3 ${sidebarOpen ? 'block' : 'hidden'}`}>Người dùng</span>
              </Link>
            </li>
            <li>
              <Link to="/products" className="flex items-center p-2 rounded hover:bg-gray-800">
                <Package size={20} />
                <span className={`ml-3 ${sidebarOpen ? 'block' : 'hidden'}`}>Sản phẩm</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center p-2 rounded hover:bg-gray-800">
                <Settings size={20} />
                <span className={`ml-3 ${sidebarOpen ? 'block' : 'hidden'}`}>Cài đặt</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell size={20} />
              </button>
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6 overflow-auto h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}