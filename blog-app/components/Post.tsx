import Link from "next/link";

type CardProps = {
  isLink: boolean;
  id: string;
  username: string;
  title: string;
  content: string;
};

export default function Card({isLink, id, username, title, content }: CardProps) {
    const cardClasses = `block w-full p-6 bg-white border border-gray-200 rounded-lg shadow ${isLink ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : ''
    } dark:bg-gray-800 dark:border-gray-700 mb-4`;
  const cardContent = (
    <div className={cardClasses}>
      <div className="font-semibold text-lg text-gray-900 dark:text-white">{username}:</div>
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
