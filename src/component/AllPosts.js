import { useEffect, useState } from "react";
import { getPost } from "../services/postServices";
import { PostCard } from "./PostCard";
import { useDataContext } from "../context/dataContext";




export function AllPosts(){
    const {postData, setPostData} = useDataContext();

    const filterData = () => {
        let temp = [];
        temp = postData.slice().sort((a,b)=>a.createdAt - b.createdAt);
        return temp;
    };
    
    const getPostData = async() => {
        const response = await getPost();
        const data = await response.json();
        setPostData(data.posts); 
    }

    useEffect(()=>{
        getPostData();
    },[]);
 
    return(<div>
        {filterData().map((data)=><PostCard props={data} key={data._id}/>)}
    </div>)
}