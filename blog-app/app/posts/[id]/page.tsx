"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Post } from '@prisma/client';
import { useRouter } from "next/navigation";
import Loading from "../../../components/Loading"
import PostComponent from "../../../components/Post"
import Header from "../../../components/Header";
import { useSession } from "next-auth/react";

interface PostWithAuthor extends Post {
    author: {
      username: string;
    };
  }
  
export default function ShowPost() {
    const { data: session } = useSession();
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
        <>
            <Header />
            <div className="w-full px-4 pt-4">
                <PostComponent 
                    isLink={false}
                    isOwner={session?.user?.name === post?.author.username}
                    id={post?.post_id || ""}
                    username={post?.author.username || ""} 
                    title={post?.title || ""} 
                    content={post?.content || ""} 
                    likeCount={post?.likeCount || 0}
                    dislikeCount={post?.dislikeCount || 0}
                />
            </div>
        </>
    );
}