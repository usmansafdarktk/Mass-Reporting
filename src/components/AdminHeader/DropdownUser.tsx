import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import UserOne from '../../images/user/admin-profile-picture.png';
import { useAdminAuth } from '../../context/AdminAuthContext';


const DropdownUser = () => {
  const navigate = useNavigate();
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    logout(); // sets isAdmin to false
    navigate('/admin/home'); // redirects to login page
  };


  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            Admin Panel
          </span>
          <span className="block text-xs">Administrator</span>
        </span>
        <span className="h-12 w-12 rounded-full">
          <img src={UserOne} alt="Admin" />
        </span>
        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0.41 0.91a1 1 0 011.18-.2L6 3.58l4.41-2.87a1 1 0 011.18 1.62l-5 3.25a1 1 0 01-1.18 0l-5-3.25a1 1 0 01-.2-1.42z" />
        </svg>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-4 w-64 rounded border bg-white shadow dark:border-strokedark dark:bg-boxdark z-50 overflow-hidden">
          <ul className="flex flex-col text-sm font-medium text-gray-700 dark:text-gray-200">
            <li>
              <Link
                to="/admin/home"
                className="block px-6 py-3 hover:text-primary"
              >
                Dashboard Home
              </Link>
              <hr className="border-t border-gray-200 dark:border-gray-600" />
            </li>
            <li>
              <Link
                to="/admin/agents"
                className="block px-6 py-3 hover:text-primary"
              >
                Manage Agents
              </Link>
              <hr className="border-t border-gray-200 dark:border-gray-600" />
            </li>
            <li>
              <Link
                to="/admin/complaints"
                className="block px-6 py-3 hover:text-primary"
              >
                Complaint Logs
              </Link>
              <hr className="border-t border-gray-200 dark:border-gray-600" />
            </li>
            <li>
              <Link
                to="/admin/settings"
                className="block px-6 py-3 hover:text-primary"
              >
                Admin Settings
              </Link>
            </li>
          </ul>
          <hr className="border-t border-gray-200 dark:border-gray-600" />
          <button
            onClick={handleLogout}
            className="w-full px-6 py-4 text-left text-sm font-semibold text-white bg-[#1c2434] hover:bg-[#1c2434] transition-colors"
          >
            Log Out
          </button>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
