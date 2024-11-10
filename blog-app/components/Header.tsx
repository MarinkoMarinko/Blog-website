import Link from 'next/link';
import { useState } from 'react';

const menuItems = [
  { name: 'Home', href: '/', current: true },
  { name: 'Sign in', href: '/login', current: false },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-gray-700 bg-gray-800">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="text-2xl font-semibold text-white">Forum</span>
        </div>
        {/* Hamburger button */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          aria-controls="navbar-hamburger"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        {/* Full menu for larger screens */}
        <div className="hidden w-full md:flex md:w-auto">
          <ul className="flex flex-col md:flex-row md:space-x-8 font-medium">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>
                  <div
                    className={`block py-2 px-3 rounded ${
                      item.current
                        ? 'text-white bg-blue-700 dark:bg-blue-600'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Dropdown menu for medium screens and below */}
      {isMenuOpen && (
        <div className="w-full md:hidden">
          <ul className="flex flex-col font-medium bg-gray-800 p-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>
                  <div
                    className={`block py-2 px-3 rounded ${
                      item.current
                        ? 'text-white bg-blue-700 dark:bg-blue-600'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
