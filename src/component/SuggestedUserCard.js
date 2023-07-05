import { useDataContext } from "../context/dataContext";
import { SuggestedUser } from "./SuggestedUsers";

export function SuggestedUserCard(){
    const {theme, state, userData, isMobile, showUsers} = useDataContext();

    const removeFoundUser = () => userData.filter((user)=>user.username !== state.foundUser.username); 

    return(<div className="follow-section-container"  style={{display: isMobile ? "absolute" : "", borderRight: isMobile ? "" : `1px solid ${theme.textColor}`, left: showUsers ? "22%" : "100%"}}>
    <div className="follow-user" style={{backgroundColor: theme.themeColor2, borderRadius: "5px", border: isMobile && `1px solid ${theme.textColor}`}}>
        <div style={{backgroundColor: theme.themeColor2 , position: "sticky", top: "0", padding: "1rem"}}>
            <h2>Suggested Users</h2>
        </div>
        <div style={{display: "flex", flexDirection: "column"}}>
            {removeFoundUser().map((user,index)=><SuggestedUser data={user} key={index}/>)}
        </div>
    </div>
</div>)
}