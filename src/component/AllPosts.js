import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import { useDataContext } from "../context/dataContext";




export function AllPosts(){
    const {postData, setPostData} = useDataContext();

    const filterData = () => {
        let temp = [];
        temp = postData.slice().sort((a,b)=>a.createdAt - b.createdAt);
        return temp;
    };

    

    return(<div>
        {filterData().map((data)=><PostCard props={data} key={data._id}/>)}
    </div>)
}