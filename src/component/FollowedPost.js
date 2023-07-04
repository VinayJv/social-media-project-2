import { PostCard } from "./PostCard";
import { useDataContext } from "../context/dataContext";



export function FollowedPost(){
    const {postData, state} = useDataContext();



    const filterData = () => {
        let temp = postData.filter((post)=>state.foundUser.following.indexOf(post.username) !== -1);
        const sortTemp = () => {
            if(state.filter === "Trending"){
                return temp.slice().sort((a,b)=>b.likes.likeCount - a.likes.likeCount);
            }
            else{
                return temp.slice().sort((a,b)=>a.createdAt - b.createdAt);
            }
        };
        return state.filter.length === 0 ? temp : sortTemp();
    };

    return(<div>
        {filterData().length === 0 && <h3 style={{margin: "1rem", textAlign: "center"}}>No Users Followed</h3>}
        {filterData().map((data)=><PostCard props={data} key={data._id}/>)}
    </div>)
}