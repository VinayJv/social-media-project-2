import { useEffect, useState } from "react";
import { getPost } from "../services/postServices";
import { PostCard } from "./PostCard";

export function AllPosts(){
    const [postData,setPostData] = useState([]);
    
    const getPostData = async() => {
        const response = await getPost();
        const data = await response.json();
        setPostData(data.posts); 
    }

    useEffect(()=>{
        getPostData();
    },[])

    return(<div>
        {postData.map((data)=><PostCard props={data} key={data._id}/>)}
    </div>)
}