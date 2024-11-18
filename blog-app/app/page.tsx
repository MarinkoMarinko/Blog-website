'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Header from '../components/Header';
import PostComponent from '../components/Post'
import Loading from '../components/Loading';
import { Post } from '@prisma/client';


export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState(false);
  const getPosts = async() => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/posts");
      if(res.status == 404)
        router.push("/404");
      else{
        const { data } = await res.json();
        setPosts(data);
      }
    } 
    catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    getPosts();
  }, [])

  if(isLoading) return <Loading />

  return (
    <>
      <Header />
      <div className="w-full p-4">
        <div className="flex flex-col gap-4">
          {posts.map((post: any) => (
            <PostComponent 
              key={post.post_id} 
              isLink={true}
              id ={post.post_id}
              username={post.author.username} 
              title={post.title} 
              content={post.content} 
              likeCount={post.likeCount}
              dislikeCount={post.dislikeCount}
            />
          ))}
        </div>
      </div>
    </>
  );
}
