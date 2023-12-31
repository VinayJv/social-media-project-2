import { useDataContext } from "../context/dataContext";

export function PostComments({data}){
    const {state, theme, userData } = useDataContext();

    const returnImageURL = (username) => userData.find((user)=>user.username === username)?.userImage || state.foundUser.userImage;
    
    return(<div>
        <h4>Comments</h4>
       {data.map(({commentBy, comment})=><div key={comment} className="comment" style={{borderBottom: `1px solid ${theme.textColor}`}}>
        <img src={returnImageURL(commentBy)} alt="" className="user-image-2"></img>
        <div>
            <p>@{commentBy}</p>
            <span>{comment}</span>
        </div>
       </div>)}
    </div>);
}