'use client';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card'
import Loading from '../components/Loading';
import { Post } from '@prisma/client';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const getPosts = async() => {
    const res = await fetch("http://localhost:3000/api/posts");
    const { data } = await res.json();
    setPosts(data);
  }
  useEffect(() => {
    getPosts();
  }, [])

  if(posts.length === 0) return <Loading />

  return (
    <>
      <Header />
      <div className="w-full p-4">
        <div className="flex flex-col gap-4">
          {posts.map((post: any) => (
            <Card 
              key={post.post_id} 
              id ={post.post_id}
              username={post.author.username} 
              title={post.title} 
              content={post.content} 
            />
          ))}
        </div>
      </div>
    </>
  );
}
