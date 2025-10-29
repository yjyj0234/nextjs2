'use client';

import { useRouter } from "next/navigation";
import React, { useState } from "react";


const CreatePost = () => {
    const [title,setTitle] = useState("");
    const router = useRouter();  //next/navigation 임에 주의
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //브라우저가 리프레쉬 되는걸 막아줌
        await fetch('http://127.0.0.1:8090/api/collections/posts/records',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                title
            })
        })
        setTitle('');
        //현재 라우터 리프레쉬, 서버에서 새로운 데이터 가져옴
        router.refresh();
    }
  return (
    <form onSubmit={handleSubmit}>
        <input type="text" 
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />
        <button type="submit">
            Create Post
        </button>

    </form>
  )
}

export default CreatePost