import { useSession } from "next-auth/react";
import Link from "next/link";

type CardProps = {
  isLink: boolean;
  isOwner: boolean;
  id: string;
  username: string;
  title: string;
  content: string;
};

export default function Card({isLink, isOwner, id, username, title, content }: CardProps) {
    const cardClasses = `block w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4 ${isLink ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : ''
    }`;
  const cardContent = (
    <div className={cardClasses}>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-lg text-gray-900 dark:text-white">{username}:</span>
        {isOwner && (
           <Link href={`/posts/${id}/edit`} className="mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-green-500 hover:text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </Link>
        )}
      </div>
      
      <hr className="my-2 border-gray-300 dark:border-gray-600" />
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">{content}</p>
    </div>
  );
  return (
    <>
      {isLink ? (
        <Link href={`posts/${id}`} >
            {cardContent} 
        </Link>
      ) : (
        cardContent
      )}
    </>
  );
}
