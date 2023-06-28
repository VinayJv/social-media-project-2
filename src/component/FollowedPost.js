import { PostCard } from "./PostCard";
import { useDataContext } from "../context/dataContext";




export function FollowedPost(){
    const {postData, state} = useDataContext();



    const filterData = () => {
        let temp = [];
        temp = postData.filter((post)=>state.foundUser.following.indexOf(post.username) !== -1)
        temp = temp.slice().sort((a,b)=>a.createdAt - b.createdAt);
        return temp;
    };

    return(<div>
        {filterData().length === 0 && <h3 style={{margin: "1rem", textAlign: "center"}}>No Users Followed</h3>}
        {filterData().map((data)=><PostCard props={data} key={data._id}/>)}
    </div>)
}