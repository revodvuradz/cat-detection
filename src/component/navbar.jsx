import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#D2B48C] border-gray-200 dark:bg-gray-900 dark:border-gray-700">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://storage.googleapis.com/pawpal/WhatsApp%20Image%202024-07-13%20at%2015.08.30_bd9873f8.jpg" className="h-8" alt="Flowbite Logo" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Pawpal</span>
    </Link>
    <button
      type="button"
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      onClick={toggleMenu}
      aria-controls="navbar-dropdown"
      aria-expanded={isMenuOpen}
    >
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>
    <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-dropdown">
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#D2B48C] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <Link to="/home" className="block py-2 px-3 text-white rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-gray-400 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Home</Link>
        </li>
        <li>
          <Link to="/detection" className="block py-2 px-3 text-white rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-gray-400 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Detection</Link>
        </li>
        <li className="relative">
          <button
            id="dropdownNavbarLink"
            onClick={toggleDropdown}
            className="flex items-center justify-between w-full py-2 px-3 text-white rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-gray-400 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
          >
            Library
            <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          <div className={`${isDropdownOpen ? 'block' : 'hidden'} z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute mt-2`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownNavbarLink">
              <li>
                <Link to="/library/catbreeds" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Cat breeds</Link>
              </li>
              <li>
                <Link to="/library/catdisease" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Cat disease</Link>
              </li>
            </ul>
            <div className="py-1">
              <Link to="/sign-out" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
            </div>
          </div>
        </li>
        <li>
          <Link to="/about" className="block py-2 px-3 text-white rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-gray-400 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent">About</Link>
        </li>
        <li>
          <Link to="/contact" className="block py-2 px-3 text-white rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-gray-400 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Contact</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

  );
};

export default Navbar;
