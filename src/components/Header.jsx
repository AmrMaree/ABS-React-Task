import { useState, useRef, useEffect } from 'react';
import 'remixicon/fonts/remixicon.css';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
    return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow h-16 flex justify-between items-center px-8 z-10">
      {/* Logo */}
      <div className="text-xl tracking-wide">
        <span className="font-['Pacifico'] text-blue-500 text-2xl">CollabNotes</span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-6">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition text-sm">
          <i className="ri-vip-crown-line mr-3"></i>
          <span>Go Premium</span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleToggle}
            className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
          >
            <i className="ri-user-3-line text-gray-600 text-lg"></i>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow py-2">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
              <div className="border-t my-1 border-gray-200"></div>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
