"use client";

import Loading from "../../../components/Loading"
import PostComponent from "../../../components/Post"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Post } from '@prisma/client';
import { useRouter } from "next/navigation";

interface PostWithAuthor extends Post {
    author: {
      username: string;
    };
  }
  
export default function ShowPost() {
    const { id } = useParams();
    const router = useRouter();
    const [post, setPost] = useState<PostWithAuthor | null>(null);
    const [isLoading, setLoading] = useState(false);
    const getPost = async() => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:3000/api/posts/" + id);
                if(res.status == 404)
                    router.push("/404");
                else{
                    const { data } = await res.json();
                    setPost(data);
                }
        } catch (error) {
           console.log(error);
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        getPost();
    }, [])
    if(isLoading) return <Loading />;
    return(
        <PostComponent 
              isLink={false}
              id={post?.post_id || ""}
              username={post?.author.username || ""} 
              title={post?.title || ""} 
              content={post?.content || ""} 
        />
    );
     
}