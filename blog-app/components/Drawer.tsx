import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import SignOut from './icons/SignOut';
import YourPosts from './icons/YourPosts';
import LikedPosts from './icons/LikedPosts';
import BookmarkedPosts from './icons/BookmarkedPosts';

export default function Drawer(){
    const { data: session } = useSession();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
          href: '/api/auth/signout', 
          svg: <SignOut /> 
        },
    ];

    return(
        <>
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
          
          {/* Drawer */}
          {isDrawerOpen && (
            <div
              id="drawer-navigation"
              className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x bg-white w-64 dark:bg-gray-800 flex flex-col` }
              tabIndex={-1} 
              aria-labelledby="drawer-navigation-label"
            >
                <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
                <button
                    type="button"
                    data-drawer-hide="drawer-navigation"
                    aria-controls="drawer-navigation"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setIsDrawerOpen(false)}
                >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <ul className="flex-1 space-y-2 mt-3">
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
        </>
    );
}
