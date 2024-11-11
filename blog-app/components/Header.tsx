import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname(); // Get the current path

  const menuItems = [
    { name: 'Home', href: '/', visible: true },
    { name: 'Sign in', href: '/login', visible: session ? false : true },
  ];

  return (
    <nav className="border-gray-700 bg-gray-800">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 mb-10">
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
              item.visible && (
                <li key={index}>
                  <Link href={item.href}>
                    <div
                      className={`block py-2 px-3 rounded ${
                        pathname === item.href // Compare pathname to href
                          ? 'text-white bg-blue-700 dark:bg-blue-600'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                      aria-current={pathname === item.href ? 'page' : undefined} // Set current page dynamically
                    >
                      {item.name}
                    </div>
                  </Link>
                </li>
              )
            ))}
            {session?.user && (
              <li className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="block py-2 px-3 rounded text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {session.user.name}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10">
                    <ul className="py-1">
                      <li>
                        <Link href="/api/auth/signout">
                          <div className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-600 hover:text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5 mr-2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                              />
                            </svg>
                            Sign out
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
      {isMenuOpen && (
        <div className="w-full md:hidden">
          <ul className="flex flex-col font-medium bg-gray-800 p-4">
            {menuItems.map((item, index) => (
              item.visible && (
                <li key={index}>
                  <Link href={item.href}>
                    <div
                      className={`block py-2 px-3 rounded ${
                        pathname === item.href // Compare pathname to href
                          ? 'text-white bg-blue-700 dark:bg-blue-600'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                      aria-current={pathname === item.href ? 'page' : undefined} // Set current page dynamically
                    >
                      {item.name}
                    </div>
                  </Link>
                </li>
              )
            ))}
            {session?.user && (
              <li className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="block py-2 px-3 rounded text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {session.user.name}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10">
                    <ul className="py-1">
                      <li>
                        <Link href="/api/auth/signout">
                          <div className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-600 hover:text-white justify-between">
                            <span>Sign out</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="red"
                              className="w-5 h-5 mr-2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                              />
                            </svg>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}