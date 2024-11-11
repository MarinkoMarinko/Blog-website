import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import SignOut from './icons/SignOut';
import YourPosts from './icons/YourPosts';
import LikedPosts from './icons/LikedPosts';
import BookmarkedPosts from './icons/BookmarkedPosts';

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Home', href: '/', visible: true},
    { name: 'Sign in', href: '/login', visible: session ? false : true },
  ];

  const drawerItems = [
    { 
      name: 'Your posts', 
      href: '#', 
      svg: <YourPosts />
    },
    { 
      name: 'Liked posts',
      href: '#',
      svg: <LikedPosts />
    },
    { 
      name: 'Bookmarked posts',
      href: '#',
      svg: <BookmarkedPosts />
    },
    { 
      name: 'Sign out',
      href: 'api/auth/signout', 
      svg: <SignOut /> 
    },
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
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle the menu open/close
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
                        pathname === item.href
                          ? 'text-white bg-blue-700 dark:bg-blue-600'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </div>
                  </Link>
                </li>
              )
            ))}
            {session && (
              <li>
                <div
                  className="block py-2 px-3 rounded hover:bg-gray-700 hover:text-white text-center cursor-pointer"
                  onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                >
                  {session.user?.name}
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Mobile menu (Hamburger) */}
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col space-y-4 font-medium">
            {menuItems.map((item, index) => (
              item.visible && (
                <li key={index}>
                  <Link href={item.href}>
                    <div
                      className={`block py-2 px-3 rounded text-center ${
                        pathname === item.href
                          ? 'text-white bg-blue-700 dark:bg-blue-600'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </div>
                  </Link>
                </li>
              )
            ))}
            {session && (
              <li>
                <div
                  className="block py-2 px-3 rounded hover:bg-gray-700 hover:text-white text-center cursor-pointer"
                  onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                >
                  {session.user?.name}
                </div>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Drawer */}
      {isDrawerOpen && (
        <div 
          id='drawer'
          data-drawer-hide="drawer"
          className="fixed top-0 right-0 w-64 h-full bg-gray-900 text-white shadow-lg p-4 z-50 flex flex-col"
        >
          <div className="flex items-center justify-between">
            <span className="mb-3"><b>{session?.user?.name}</b></span>
            <button
              type="button"
              className="self-end text-white mb-4"
              onClick={() => setIsDrawerOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:bg-gray-700 rounded-sm"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <hr className="mb-2" />
          <ul className="flex-1 space-y-2">
            {drawerItems.slice(0, -1).map((item, index) => (
              <li key={index}>
                <Link href={item.href}>
                  <div className="py-2 px-3 hover:bg-gray-700 rounded flex items-center justify-between">
                    {item.name}
                    {item.svg}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <hr className="mb-2" />
            <Link href={drawerItems[drawerItems.length - 1].href}>
              <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-700 rounded">
                {drawerItems[drawerItems.length - 1].name}
                {drawerItems[drawerItems.length - 1].svg}
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
