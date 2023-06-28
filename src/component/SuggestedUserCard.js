import { useDataContext } from "../context/dataContext";
import { SuggestedUser } from "./SuggestedUsers";

export function SuggestedUserCard(){
    const {theme, state, userData} = useDataContext();

    const removeFoundUser = () => userData.filter((user)=>user.username !== state.foundUser.username); 

    return(<div className="follow-section-container"  style={{borderRight: `1px solid ${theme.textColor}`}}>
    <div className="follow-user" style={{backgroundColor: theme.themeColor2, borderRadius: "5px", boxShadow: theme.boxShadow}}>
        <div style={{backgroundColor: theme.themeColor2 , position: "sticky", top: "0", padding: "1rem"}}>
            <h2>Suggested Users</h2>
        </div>
        <div style={{display: "flex", flexDirection: "column"}}>
            {removeFoundUser().map((user,index)=><SuggestedUser data={user} key={index}/>)}
        </div>
    </div>
</div>)
}