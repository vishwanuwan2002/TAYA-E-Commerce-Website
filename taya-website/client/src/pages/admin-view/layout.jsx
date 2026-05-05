import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <aside className="w-64 bg-gray-800 p-4">
        <h1 className="text-2xl font-bold mb-8">Admin</h1>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/admin/dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/admin/products" className="hover:text-gray-300">
                Products
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/admin/orders" className="hover:text-gray-300">
                Orders
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="absolute bottom-4 left-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
